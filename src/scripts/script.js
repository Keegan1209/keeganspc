import { Pane } from 'https://cdn.skypack.dev/tweakpane@4.0.4'
// import gsap from 'https://cdn.skypack.dev/gsap@3.12.0'
// import Draggable from 'https://cdn.skypack.dev/gsap@3.12.0/Draggable'

// gsap.registerPlugin(Draggable, InertiaPlugin)

const list = document.querySelector('ul')

const config = {
  theme: 'system',
  items: 20,
}

const items = [
  'planning',
  'properties',
  'counters',
  'masking',
  '3D',
  'blending',
  'siblings',
  'speech',
  'typography',
  'magnetism',
  'keyframes',
  'easing',
  'staggers',
  'composition',
  'popovers',
  'transitions',
  'clipping',
  'morphing',
  'timing',
  'paths',
  'svg',
  'scrolling',
]

const generateItems = () => {
  list.innerHTML = `
    ${items
      .map(
        (item, index) => `<li>
        <article>
          <a href="#"><span aria-hidden="true">${(index + 1)
            .toString()
            .padStart(2, '0')}.&nbsp;</span>${item}</a>
          <div>
            <img src="https://picsum.photos/1000/1500?random=${index}" alt="" />
          </div>
        </article>
        </li>`
      )
      .join('')}
  `
}
generateItems()

const ctrl = new Pane({
  title: 'Config',
  expanded: false,
})

const update = () => {
  document.documentElement.dataset.theme = config.theme
}

const sync = (event) => {
  if (
    !document.startViewTransition ||
    event.target.controller.view.labelElement.innerText !== 'Theme'
  )
    return update()
  document.startViewTransition(() => update())
}

ctrl.addBinding(config, 'theme', {
  label: 'Theme',
  options: {
    System: 'system',
    Light: 'light',
    Dark: 'dark',
  },
})

ctrl.on('change', sync)
update()

const proxy = document.createElement('div')
const updateScroll = function () {
  const x = this.x
  list.scroll({
    left: this.scrollLeft + -this.x,
    behavior: 'instant',
  })
}
const dragger = Draggable.create(proxy, {
  type: 'x',
  trigger: list,
  inertia: true,
  allowContextMenu: true,
  onPressInit: function () {
    document.documentElement.dataset.snap = false
    this.scrollLeft = list.scrollLeft
    gsap.set(proxy, { clearProps: 'all' })
  },
  onDragStart: () => {
    document.documentElement.dataset.dragging = true
  },
  onDragEnd: () => {
    document.documentElement.dataset.dragging = false
  },
  onDrag: updateScroll,
  onThrowUpdate: updateScroll,
})
