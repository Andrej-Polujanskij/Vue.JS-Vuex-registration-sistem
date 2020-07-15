<template >
    <div class="container2">
        <div class="reservations" >
            <h2>Reservations</h2>
            <div>
                <datepicker 
                    :highlighted="highlightedFn"
                    :monday-first="true" 
                    placeholder="Select Date" 
                    v-model="searchDate"
                ></datepicker>
                <button 
                    v-if="searchDate"
                    @click="ShowAllReserv" 
                    class="allBtn btn" 
                    type="button"
                 >All Reservations
                 </button>
            </div>
        </div>
        <div class="table" >
            <table v-if="Reservations.length">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Edit / Delete</th>
                </tr>
            </thead>
            <tbody >
                <tr
                    v-for="(item, i) in Reservations"
                    :key="item.id"
                    :class="[ !item.isEdit ? '' : 'active-blur', activeClass]"

                    >
                    <td>{{i + 1}}</td>
                    <td>
                        <input v-if="item.isEdit" type="text" v-model="editName" >
                        <span v-else>{{item.name}} </span>
                    </td>
                    <td>
                        <datepicker :monday-first="true" v-if="item.isEdit" :format="format" v-model="editDate"></datepicker>
                        <span v-else>  {{ new Date(item.date).toLocaleDateString("fr-CA") }}</span>
                   
                    </td>
                    <td>
                    <div class="edit-time-cont" v-if="item.isEdit" >
                        <div v-if="item.isEdit" id="timeInput" @click="showEditTime" > {{editTime}}
                        </div>
                            <div class="block-content" v-if="showTime">
                                <div class="time-container" >
                                    <div class="houres">
                                        <input 
                                            v-for="(item, i) in timeData"
                                            :key="i.id" type="button"
                                            class="time"
                                            
                                            :value="i"
                                            @click="getEditHour(i)"
                                        >

                                    </div>
                                    <div class="minutes">
                                           <input type="button"
                                                :disabled="!hours || isUnavalible(hours +':00')"
                                                :class="{unavalible: isUnavalible(hours +':00')}"
                                                :value="hours +':00'"
                                                @click="getFullTime(hours +':00')"
                                            />
                                            <input type="button" 
                                                :disabled="!hours || isUnavalible(hours +':15')" 
                                                :class="{unavalible: isUnavalible(hours +':15')}" 
                                                :value="hours +':15'"
                                                @click="getFullTime(hours +':15')" 
                                            />
                                            <input type="button"
                                                :disabled="!hours || isUnavalible(hours +':30')"
                                                :class="{unavalible: isUnavalible(hours +':30')}"
                                                :value="hours +':30'"
                                                @click="getFullTime(hours +':30')"
                                            />
                                            <input type="button"
                                                :disabled="!hours || isUnavalible(hours +':45')"
                                                :class="{unavalible: isUnavalible(hours +':45')}"
                                                :value="hours +':45'"
                                                @click="getFullTime(hours +':45')"
                                            />
                                    </div>
                                </div>
                            </div>
                            
                    </div>

                        <span v-else> {{item.time}} </span> 
                    </td>
                    <td>
                        <button 
                            v-if="!item.isEdit" 
                            :disabled="hiddemBtn" 
                            :class="{'hidden-btn': hiddemBtn}" 
                            class="editBtn btn" 
                            @click="editReservation(item.id)"
                        >
                        EDIT</button>
                        <button 
                            v-if="!item.isEdit" 
                            :disabled="hiddemBtn" 
                            :class="{'hidden-btn': hiddemBtn}" 
                            class="deletBTN btn" 
                            @click="delReservation(item.id)"
                        >
                        DELETE</button>
                         
                        <button v-else class="saveBtn btn" @click="saveEditReserv(item.id)">SAVE</button> 
                    </td>
                <tr >
                </tr >
            </tbody>


            </table>
            <p class="message" v-else>No reservations on this day</p>
        </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
    name: 'AllReservations',
    components: {
        Datepicker
    },
    data() {
        return{
            editName: '',
            editDate: '',
            editTime: '',
            editID: '',

            shortDate: '',
            format: 'dd/MM/yyyy',

             timeData: { 
                '10:00': ['00', '15', '30', '45'],
                '11:00': ['00', '15', '30', '45'],
                '12:00': ['00', '15', '30', '45'],
                '13:00': ['00', '15', '30', '45'],
                '14:00': ['00', '15', '30', '45'],
                '15:00': ['00', '15', '30', '45'],
                '16:00': ['00', '15', '30', '45'],
                '17:00': ['00', '15', '30', '45'],
                '18:00': ['00', '15', '30', '45'],
                '19:00': ['00', '15', '30', '45'],
            },
            hours: '',
            showTime: false,
            hiddemBtn: false,

            searchDate: null,
            closeDays: null,
             highlightedFn: {
                'dates': [new Date()]
            },
        }
    },
    computed: {
          ...mapGetters(['AllReservations']),
        Reservations() {
            if(this.searchDate){    
                return this.$store.getters.FilterReservation(this.searchDate)
            }else{
                return this.$store.getters.AllReservations
            }
        },
        
        activeClass(){
            if(this.hiddemBtn){
                return 'blur' 
            }else{
                return 'active'
            }
        }
    },
    methods: {
        delReservation(id){  
            // this.$store.dispatch('delReservation', id)
            this.delReservation(id)
        },
        ...mapActions({delReservation: 'delReservation'}),

        editReservation(id){
            const editItem = this.Reservations.find(item => item.id === id)

            this.editName = editItem.name
            this.editDate =  editItem.date
            this.editTime = editItem.time
            this.editID = editItem.id

            this.shortDate =   new Date(editItem.date).toLocaleDateString()

            if(editItem.id === id){
                editItem.isEdit = !editItem.isEdit
            }
            this.hiddemBtn = !this.hiddemBtn
        },
        getEditHour(item) {
             const hour = item.slice(0, 2)
             this.hours = hour

             const currentDate = this.AllReservations.filter(item => new Date(item.date).toLocaleDateString("fr-CA") === new Date(this.editDate).toLocaleDateString("fr-CA"))
            this.closeDays = currentDate
        },
        isUnavalible(time){

            if(this.closeDays !== null){
                return this.closeDays.some( item => item.time == time)
            }
        
        },
        getFullTime(item){
            this.editTime = item
            this.showTime = !this.showTime
        },
        showEditTime(){
            this.showTime = !this.showTime
        },
        saveEditReserv(id){
            const editItem = this.Reservations.find(item => item.id === id)
                if(editItem.id === id){
                    editItem.isEdit = !editItem.isEdit
                }
                this.hours = ''
                this.hiddemBtn = !this.hiddemBtn

            this.$store.dispatch('editReservation', {
                    id: this.editID,
                    name: this.editName,
                    date: this.editDate,
                    time: this.editTime
                })
        },
        ShowAllReserv(){
            this.searchDate = null
        }

    }
}
</script>

<style lang="scss" scoped>

    .container2{
         text-align: left;

        .reservations{
        
            margin-top: 2.5rem;
            color: black;
            font-weight: bolder;
            font-size: 22px;
            border-bottom: 1px solid white;
        }
        table{
            width: 100%;
            color: black;
            
            thead{
                text-transform: uppercase;
                tr{
                    th{
                        border-bottom: 1px solid #fff;
                        padding: 8px 8px;
                        width: 20%;
                       
                    }
                }
            }
            tbody{
                tr{
                    background: rgba(255, 255, 255, 0.6);
                     &.blur{
                             background: rgba(0, 0, 0, 0.6);
                        }
                     &.active{
                             background: rgba(255, 255, 255, 0.6);
                        }
                    &.active-blur{
                         background: rgba(255, 255, 255, 0.6);
                    }
                    td{
                        padding: 8px 8px;
                        #timeInput{
                            border: 1px solid gray;
                            font-size: 13px;
                            padding: 2px;
                            background: #fff;
                            width: 60%;
                        }
                    }
                }
            }
        }
        .btn{
            font-size: 14px;
            color: #000;
            font-weight: bolder;
            padding: 6px 10px;
            border-radius: 6px;
            cursor: pointer;
        }
        .editBtn{
            background: yellow;
            margin-right: 1.5rem;
        }
        .deletBTN{
            background: red;
        }
        .saveBtn{
            background: green;
        }
        .allBtn{
            background: #d742d7;
            text-transform: uppercase;
            margin: 0.5rem 0;
        }
        .hidden-btn{
            opacity: 0.6;
        }
        .edit-time-cont{
            position: relative;
        }
        .block-content{
        background: hsla(0,0%,100%,.6);
        width: 100%;
        position: absolute;
              .time-container{
    display: flex;
    -webkit-justify-content: space-around;
    justify-content: space-around;
  }

  .houres{
    width: 50%;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-align-items: center;
    align-items: center;
    padding: 10px 0;
  
  .time{
    width: 80%;
    border: none;
    font-size: 16px;
    padding: 1px;
    border-radius: 5px;
    cursor: pointer;
    background: #f4ced5;
    margin: 5px 0;
  }
  }
  .minutes{
    width: 45%;
display: -webkit-flex;
display: flex;
-webkit-flex-direction: column;
flex-direction: column;
-webkit-align-items: center;
align-items: center;
-webkit-justify-content: space-around;
justify-content: space-around;
input{
  width: 80%;
border: none;
font-size: 22px;
margin: 5px;
border-radius: 5px;
cursor: pointer;
background: #ec91a2;
padding: 10px;
}
        }

          }
          .table{
            display: flex;
            justify-content: center;
            .message{
                color: white;
                font-size: 28px;
                font-weight: bolder;
                text-align: center;
                border: 3px solid #9b0000;
                padding: 32px;
                width: 500px;
            }
        }
    }
</style>