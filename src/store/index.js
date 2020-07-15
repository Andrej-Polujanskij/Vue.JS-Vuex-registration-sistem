import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    reservations: JSON.parse(localStorage.getItem('reservations') || '[]')
  },
  mutations: {
    makeReservation(state, item){
      state.reservations.unshift(item);

      localStorage.setItem('reservations', JSON.stringify(state.reservations))
    },

    delReservation(state, id) {

      const myState = state.reservations.filter(item => item.id !== id)
      state.reservations = myState
      localStorage.setItem('reservations', JSON.stringify(state.reservations))
    },

    editReservation(state, {id, name, date, time}) {
      const allReverv = state.reservations.concat()

      const index = allReverv.findIndex(item => item.id === id)
      const singleReserv = allReverv[index]
      allReverv[index] = {...singleReserv, name, date, time}

      state.reservations = allReverv
      localStorage.setItem('reservations', JSON.stringify(state.reservations))
      
    }
  },
  actions: {
       delReservation({commit}, id){
         commit('delReservation', id)
    },
    editReservation({commit}, items){
      commit('editReservation', items)
    }

  },
  getters: {
    AllReservations(state){
        const allReverv = state.reservations.concat()
        const sortByDate = allReverv.sort((a, b) => { return new Date(b.date) - new Date(a.date) })
        // || Number( b.time.slice(0, 2) + b.time.slice(3) ) > Number( a.time.slice(0, 2) + a.time.slice(3) ) 
        // console.log( Number( allReverv[0].time.slice(0, 2) + allReverv[0].time.slice(3) ));
        return sortByDate
    },
    FilterReservation: state => filterData => {
      const allReverv = state.reservations.concat()
      const sortByDate = allReverv.sort((a, b) => { return new Date(b.date) - new Date(a.date) })
      
      const sortByCurrentDate = sortByDate.filter(item => new Date(item.date).toLocaleDateString("fr-CA") === filterData.toLocaleDateString("fr-CA"))

      return sortByCurrentDate
    }

  },
  modules: {
  }
})
