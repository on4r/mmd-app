export default {
  data() {
    return {
      onLine: true
    }
  },
  created() {
    window.addEventListener('offline', e => this.onLine = false)
    window.addEventListener('online', e => this.onLine = true)
  }
}