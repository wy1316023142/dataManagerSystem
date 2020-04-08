import Api from '@/common/api.js'

export const domHeightMixin = {
    data() {
        return {
            tabHeight:'0',
        }
    },
    mounted(){
        this.$nextTick(() => {
            this.tabHeight=this.$refs.content.offsetHeight-this.$refs.head.offsetHeight-this.$refs.pageBox.offsetHeight-this.$refs.tableHeader.offsetHeight
            window.onresize =()=> {
                this.tabHeight=this.$refs.content.offsetHeight-this.$refs.head.offsetHeight-this.$refs.pageBox.offsetHeight-this.$refs.tableHeader.offsetHeight
            };
        })
    }
}


export const pageMixin = {
    data() {
        return {
            filter: {
                pageNumber: 1,
                pageSize: 10,
            },
            total:0,
        }
    },
    mounted(){

    },
    methods:{
        pageChange(val) {
            this.filter.pageNumber = val;
            this._fetchData();
        },
    }
}

export const getEventLevel = {
    data() {
        return {
            recordData:[],
            objectType:[],
            eventLevel:[],
        }
    },

    methods:{
        getEventLevel:async function() {
            const data = await Api.getEventType.get().then(res => res.data.result)
            this.eventType=data
        },
        getObjectType:async function() {
            const data = await Api.getEventType.get().then(res => res.data.result)
            this.eventType=data
        },
        getEventLevel:async function() {
            const data = await Api.getEventType.get().then(res => res.data.result)
            this.eventType=data
        },
    }
}
