import * as fb from 'firebase'
import { generateCodeFrame } from 'vue-template-compiler'

class Ad {
	constructor(description, imageSrc, ownerId, promo, title, id = null ) {
        this.title = title,
        this.description = description,
        this.ownerId = ownerId,
        this.imageSrc = imageSrc,
        this.promo = promo,
        this.id = id
	}
}

export default {
    state: {
        ads: []
    },
    mutations: {
        createAd(state, payload) {
            state.ads.push(payload) 
        },
        loadAds(state, payload) {
            state.ads = payload
        },
        updateAd (state, {title, description, id}) {
            const ad = state.ads.find(a => a.id === id)
            ad.title = title
            ad.description = description
        }
    },
    actions: {
        async createAd({commit, getters}, payload) {
            commit('clearError')
            commit('setLoading', true)

            const image = payload.image
        
            try {
                const newAd = new Ad(
                    payload.description, 
                    '', 
                    getters.user.id, 
                    payload.promo, 
                    payload.title
                )
    
                const ad = await fb.database().ref('ads').push(newAd)
                
                const imageExt = image.name.slice(image.name.lastIndexOf('.'))
                
                const storageRef = fb.storage().ref(`ads/${ad.key}${imageExt}`)

                await storageRef.put(image)
                
                const imageSrc = await storageRef.getDownloadURL()

                await fb.database().ref('ads').child(ad.key).update({
                    imageSrc
                })

                commit('setLoading', false)
                commit('createAd', {
                    ...newAd,
                    id: ad.key,
                    imageSrc
                })
            } catch(error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },
        async fetchAds({commit}) {
            commit('clearError')
            commit('setLoading', true)

            const resultAds = []

            try{
                const fbVal = await fb.database().ref('ads').once('value')
                const ads = fbVal.val()
                
                Object.keys(ads).forEach(key => {
                    const ad = ads[key]
                    const newAd = new Ad(
                        ad.description, 
                        ad.imageSrc, 
                        ad.ownerId, 
                        ad.promo, 
                        ad.title,
                        key
                    )
                    resultAds.push(newAd)
                })
                commit('loadAds', resultAds)
                commit('setLoading', false)
            } catch(error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },
        async updateAd({commit}, {title, description, id}) {
           commit('clearError')
           commit('setLoading', true)
           
           try {
            await fb.database().ref('ads').child(id).update({
                title, description
            })
            commit('updateAd', {
                title, description, id
            })  
            commit('setLoading', false)
           } catch(error) {
               commit('setError', errror.message)
               commit('setLoading', false)
           }
        }
    },
    getters: {
        ads(state) {
            return state.ads
        },
        promoAds(state) {
            return state.ads.filter(ad => ad.promo)
        },
        myAds(state, getters) {
            if(getters.user === null) { 
                return new Array()
            }
            return state.ads.filter(ad => {
                return ad.ownerId === getters.user.id
            })
        },
        adById(state) {
            return adId => {
                return state.ads.find(ad => ad.id === adId)
            }
        }
    }
}