<template>
  <div class="calendar">
    <div v-if="tab === 'date'">
      <div class="bar calendar-header">
        <div flex-auto>
          {{ naviYear }}&nbsp;{{ YEAR_LABEL }}&nbsp;{{ MONTHS[naviMonth] }}&nbsp;{{ MONTH_LABEL }}
        </div>
        <div class="flex-divider" transparent></div>
        <a class="btn btn-text btn-primary icon icon-key-left" @click="goPrevMonth"></a>
        <div class="flex-divider" transparent></div>
        <a class="btn btn-text btn-primary icon icon-key-right" @click="goNextMonth"></a>
      </div>
      <div class="flex-box calendar-week-header">
        <div v-for="s in WEEK_DAYS" flex-auto>{{ s }}</div>
      </div>
      <div class="calendar-grid">
        <div v-for="(row, index) in dateRows" class="flex-box calendar-grid-row">
          <div v-for="cell in row" flex-auto class="calendar-date-cell"
            :not-this-month="cell.month !== naviMonth" :out-of-range="cell.outOfRange">
            {{ cell.date }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex-box" flex-direction="column" v-else>
      <div class="flex-box" flex-none></div>
      <div class="flex-box" flex-auto flex-direction="column">
        <div class="flex-box" v-for="row in yearRows">
        </div>
      </div>
      <div class="flex-box" v-if="selectMode !== year" flex-none></div>
    </div>
  </div>
</template>

<script>
  import isDate from 'lodash.isdate'
  import isString from 'lodash.isstring'

  export default {
    props: ['value', 'selectMode', 'language'],
    model: {
      prop: 'value',
      event: 'change'
    },
    computed: {
      isZh () {
        return (this.language || navigator.language || navigator.userLanguage).indexOf('zh') === 0
      },
      MONTHS () {
        return this.isZh
          ? ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
          : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      WEEK_DAYS () {
        return this.isZh
          ? ['日', '一', '二', '三', '四', '五', '六']
          : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
      },
      YEAR_LABEL () {
        return this.isZh ? '年' : ''
      },
      MONTH_LABEL () {
        return this.isZh ? '月' : ''
      },
      MAX_DAYS () {
        return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      },
      yearRows () {

      }
    },
    data () {
      const today = new Date()
      const year = today.getFullYear()
      const month = today.getMonth()
      const date = today.getDate()
      return {
        tab: 'date',
        today,
        year,
        month,
        date,
        naviYear: year,
        naviMonth: month,
        naviDate: date,
        dateRows: [ [], [], [], [], [], [], [] ]
      }
    },
    methods: {
      setTab (v) {
        this.tab = ['year', 'month'].indexOf(v) >= 0 ? 'year' : 'date'
      },
      setDataRows () {
        const firstDay = new Date(this.naviYear, this.naviMonth, 1).getDay()
        const maxDays = this.month === 1 &&
          ((this.naviYear % 4 === 0 && this.naviMonth % 100 !== 0) || this.naviYear % 400 === 0)
          ? 29
          : this.MAX_DAYS[this.month]
        let n = 1
        for (let i = 0, len = this.dateRows.length; i < len; i++) {
          let row = this.dateRows[i]
          for (let j = 0; j < 7; j++) {
            const date = (i === 0 && j >= firstDay) || (i > 0 && n <= maxDays) ? n : ''
            const cell = {
              date
            }
            Vue.set(row, j, cell)
            if (date) n++
          }
        }
      },
      resetDate (value) {
        let v
        try {
          v = value
            ? (
              isDate(value)
                ? value
                : (isString(value) ? new Date(Date.parse(value)) : null)
            )
            : null
        } catch (e) {
        }
        if (!v) v = new Date()
        const year = v.getFullYear()
        const month = v.getMonth()
        const date = v.getDate()
        this.year = year
        this.month = month
        this.date = date
        this.naviYear = year
        this.naviMonth = month
        this.naviDate = date
        this.setDataRows()
      },
      goMonth (month) {
        if (month < 0) {
          this.naviMonth = 11
          this.naviYear--
        } else if (month > 11) {
          this.naviMonth = 0
          this.naviYear++
        } else this.naviMonth = month
        this.setDataRows()
      },
      goPrevMonth () {
        this.goMonth(this.naviMonth - 1)
      },
      goNextMonth () {
        this.goMonth(this.naviMonth + 1)
      }
    },
    mounted () {
      this.setTab(this.selectMode)
      this.resetDate(this.value)
    },
    watch: {
      value (v) {
        this.resetDate(v)
      },
      selectMode (v) {
        this.setTab(v)
      }
    }
  }
</script>
