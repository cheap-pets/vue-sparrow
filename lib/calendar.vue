<template>
  <div class="calendar flex-box" flex-direction="column">
    <template v-if="tab === 'date'">
      <div class="bar calendar-header header-line" flex-none>
        <div class="flex-divider" transparent />
        <div flex-auto>
          <span class="calendar-title" @click="goSelectYear">
            {{ naviDateYear }}&nbsp;{{ YEAR_LABEL }}&nbsp;{{ MONTHS[naviDateMonth] }}&nbsp;{{ MONTH_LABEL }}
          </span>
        </div>
        <div class="flex-divider" transparent />
        <a class="btn btn-text btn-primary icon icon-key-left" @click="goPrevMonth" />
        <a class="btn btn-text btn-primary icon icon-event" @click="goThisMonth" />
        <a class="btn btn-text btn-primary icon icon-key-right" @click="goNextMonth" />
      </div>
      <div class="flex-box calendar-week-header header-line" flex-none>
        <div v-for="s in WEEK_DAYS" :key="s" flex-auto>
          {{ s }}
        </div>
      </div>
      <div class="calendar-grid flex-box" flex-auto flex-direction="column">
        <div v-for="(row, rowIdx) in dateRows" :key="rowIdx"
          flex-auto class="flex-box calendar-grid-row" align-items="stretch">
          <div v-for="(cell, cellIdx) in row" :key="cellIdx"
            class="flex-box calendar-grid-cell" flex-auto justify-content="center"
            :class="{ active: cell.active }" :is-today="cell.today" :marked="cell.marked"
            :not-this-month="cell.notThisMonth" :out-of-range="cell.outOfRange" @click="onDateCellClick(cell)">
            {{ cell.date }}
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="bar calendar-header header-line" flex-none>
        <div class="flex-divider" transparent />
        <div flex-auto>
          <span class="calendar-title">
            {{ naviStartYear }}&nbsp;~&nbsp;{{ naviStartYear + 9 }}&nbsp;
          </span>
        </div>
        <div class="flex-divider" transparent />
        <a class="btn btn-text btn-primary icon icon-key-left" @click="goPrevYears" />
        <a class="btn btn-text btn-primary icon icon-event" @click="goThisYear" />
        <a class="btn btn-text btn-primary icon icon-key-right" @click="goNextYears" />
      </div>
      <div class="calendar-grid flex-box" :class="{ 'header-line': selectMode !== 'year' }"
        flex-auto flex-direction="column">
        <div v-for="(row, rowIdx) in yearRows" :key="rowIdx" flex-auto class="flex-box calendar-grid-row" align-items="stretch">
          <div v-for="(cell, cellIdx) in row" :key="cellIdx" flex-auto class="flex-box calendar-grid-cell"
            :class="{ active: cell.year === naviYear }" justify-content="center" :this-year="cell.year === thisYear"
            :not-this-decade="cell.notThisDecade" :out-of-range="cell.outOfRange" @click="onYearCellClick(cell)">
            {{ cell.year }}
          </div>
        </div>
      </div>
      <div v-if="selectMode !== 'year'" class="calendar-grid flex-box" flex-auto flex-direction="column">
        <div v-for="(row, rowIdx) in monthRows" :key="rowIdx"
          flex-auto class="flex-box calendar-grid-row" align-items="stretch">
          <div v-for="(cell, cellIdx) in row" :key="cellIdx" flex-auto class="flex-box calendar-grid-cell"
            :class="{ active: cell.month === naviMonth }" justify-content="center"
            @click="onMonthCellClick(cell)">
            {{ cell.label }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import isDate from 'lodash.isdate'
  import isString from 'lodash.isstring'

  function _getFirstDay ({ year, month }) {
    return (new Date(year, month, 1)).getDay()
  }

  const MAX_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  function _getMaxDays ({ year, month }) {
    return month === 1 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
      ? 29
      : MAX_DAYS[month]
  }

  function _getSiblingMonth ({ year, month, step }) {
    month += step
    if (month < 0) {
      month = 11
      year--
    } else if (month > 11) {
      month = 0
      year++
    }
    return { year, month }
  }

  function _parseDate (v) {
    v = v || new Date()
    return {
      year: v.getFullYear(),
      month: v.getMonth(),
      date: v.getDate()
    }
  }

  function _isSame (a, b) {
    return a.year === b.year && a.month === b.month && (!a.date || !b.date || a.date === b.date)
  }

  export default {
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: Date,
      selectMode: {
        type: String,
        default: 'date'
      },
      language: {
        type: String,
        default: 'zh-CN'
      },
      rangeStart: Date,
      rangeEnd: Date,
      markedDates: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      const { year, month, date } = _parseDate()
      return {
        year,
        month,
        date,
        thisYear: year,
        thisMonth: month,
        naviStartYear: null,
        naviYear: null,
        naviMonth: null,
        naviDate: null,
        naviDateYear: year,
        naviDateMonth: month,
        monthlyMarkedDates: [],
        dateRows: [],
        yearRows: [],
        tab: 'date'
      }
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
      monthRows () {
        const rows = []
        let n = 0
        for (let i = 0; i < 3; i++) {
          const row = []
          for (let j = 0; j < 4; j++) {
            row.push({
              month: n,
              label: this.MONTHS[n] + this.MONTH_LABEL
            })
            n++
          }
          rows.push(row)
        }
        return rows
      }
    },
    watch: {
      value (v) {
        this.resetDate(v)
      },
      rangeStart (v) {
        this.resetDate(this.value)
      },
      rangeEnd (v) {
        this.resetDate(this.value)
      },
      markedDates (v) {
        this.resetDate(this.value)
      }
    },
    mounted () {
      this.setTab(this.selectMode === 'year' || this.selectMode === 'month' ? 'year' : 'date')
      this.resetDate(this.value)
    },
    methods: {
      setTab (v) {
        this.tab = ['year', 'month'].indexOf(v) >= 0 ? 'year' : 'date'
      },
      setDateCellStatus (cell) {
        const date = new Date(cell.year, cell.month, cell.date)
        const str = cell.year + '-' + (cell.month + 1) + '-' + cell.date
        const { rangeStart, rangeEnd } = this
        if (_isSame(cell, this)) cell.active = true
        if (_isSame(cell, _parseDate())) cell.today = true
        if ((rangeStart && date < rangeStart) || (rangeEnd && date > rangeEnd)) cell.outOfRange = true
        if (this.monthlyMarkedDates.indexOf(str) >= 0) cell.marked = true
      },
      updateDateCells () {
        this.filterMarkedDates()
        const year = this.naviDateYear
        const month = this.naviDateMonth
        const firstDay = _getFirstDay({ year, month })
        const maxDays = _getMaxDays({ year, month })
        const prev = _getSiblingMonth({ year, month, step: -1 })
        const prevMaxDays = _getMaxDays(prev)
        const next = _getSiblingMonth({ year, month, step: 1 })
        const rows = []
        let n = 1
        for (let i = 0; i < 7; i++) {
          const row = []
          let cell
          for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
              cell = {
                year: prev.year,
                month: prev.month,
                date: prevMaxDays - firstDay + j + 1,
                notThisMonth: true
              }
            } else if (i > 0 && n > maxDays) {
              cell = {
                year: next.year,
                month: next.month,
                date: n - maxDays,
                notThisMonth: true
              }
              n++
            } else {
              cell = {
                year: year,
                month: month,
                date: n
              }
              n++
            }
            this.setDateCellStatus(cell)
            row.push(cell)
          }
          rows.push(row)
        }
        this.dateRows = rows
        this.$emit('navigate', { year, month })
      },
      filterMarkedDates () {
        const arr = []
        const current = { year: this.naviDateYear, month: this.naviDateMonth }
        this.markedDates.forEach(date => {
          const p = _parseDate(date)
          if (_isSame(p, current)) arr.push(p.year + '-' + (p.month + 1) + '-' + p.date)
        })
        this.monthlyMarkedDates = arr
      },
      updateYearCells () {
        const rows = []
        let n = this.naviStartYear - 1
        for (let i = 0; i < 3; i++) {
          const row = []
          for (let j = 0; j < 4; j++) {
            const cell = {
              year: n,
              notThisDecade: (n < this.naviStartYear || n > this.naviStartYear + 9) ? true : undefined
            }
            row.push(cell)
            n++
          }
          rows.push(row)
        }
        this.yearRows = rows
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
        const { year, month, date } = _parseDate(v)
        this.year = year
        this.month = month
        this.date = date
        this.naviStartYear = Math.trunc(year / 10) * 10
        this.naviYear = year
        this.naviMonth = month
        this.naviDateYear = year
        this.naviDateMonth = month
        this.naviDate = date
        this.updateYearCells()
        this.updateDateCells()
      },
      goMonth (step) {
        const { year, month } = _getSiblingMonth({
          year: this.naviDateYear,
          month: this.naviDateMonth,
          step
        })
        this.naviDateYear = year
        this.naviDateMonth = month
        this.updateDateCells()
      },
      goPrevMonth () {
        this.goMonth(-1)
      },
      goNextMonth () {
        this.goMonth(1)
      },
      goThisMonth () {
        const { year, month } = _parseDate()
        this.naviDateYear = year
        this.naviDateMonth = month
        this.updateDateCells()
      },
      goSelectYear () {
        this.naviMonth = this.naviDateMonth
        this.naviYear = this.naviDateYear
        this.naviStartYear = Math.trunc(this.naviYear / 10) * 10
        this.updateYearCells()
        this.tab = 'year'
      },
      goPrevYears () {
        this.naviStartYear -= 10
        this.updateYearCells()
      },
      goNextYears () {
        this.naviStartYear += 10
        this.updateYearCells()
      },
      goThisYear () {
        this.naviStartYear = Math.trunc((new Date()).getFullYear() / 10) * 10
        this.updateYearCells()
      },
      onYearCellClick (cell) {
        this.naviYear = cell.year
        if (this.selectMode === 'year') {
          this.$emit('change', new Date(this.naviYear, 1, 1), this.naviYear)
        }
      },
      onMonthCellClick (cell) {
        this.naviMonth = cell.month
        if (this.naviYear >= this.naviStartYear - 1 && this.naviYear < this.naviStartYear + 11) {
          if (this.selectMode !== 'year' && this.selectMode !== 'month') {
            this.naviDateYear = this.naviYear
            this.naviDateMonth = this.naviMonth
            this.updateDateCells()
            this.tab = 'date'
          } else {
            this.$emit('change', new Date(this.naviYear, this.naviMonth, 1), this.naviYear, this.naviMonth)
          }
        }
      },
      onDateCellClick (cell) {
        if (cell.outOfRange) return
        this.naviDate = cell.date
        if (this.year !== cell.year || this.month !== cell.month || this.date !== cell.month) {
          const value = new Date(cell.year, cell.month, cell.date)
          this.$emit('change', value, cell.year, cell.month, cell.date)
        }
      }
    }
  }
</script>
