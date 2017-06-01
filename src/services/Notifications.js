const Notifications = {
  container: document.getElementById('notifications'),
  error(message) {
    const el = document.createElement('div')
    el.classList.add('notification', 'is-danger', 'animated', 'fadeInRight', 'faster')
    el.innerText = message
    this.container.appendChild(el)
    setTimeout(() => {
      el.classList.remove('fadeInRight')
      el.classList.add('fadeOutRight')
      setTimeout(() => {
        el.remove()
      }, 500)
    }, 3000)
  }
}

export default Notifications
