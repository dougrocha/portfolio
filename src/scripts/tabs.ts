const tabsContainer = document.querySelector('.tabs-container')
const tabsList = tabsContainer?.querySelector('ul')
const tabButtons = tabsList?.querySelectorAll('a')
const tabPanels = tabsContainer?.querySelectorAll('.tabs__panels > div')

tabsList?.setAttribute('role', 'tablist')

tabsList?.querySelectorAll('li').forEach(listItem => {
  listItem.setAttribute('role', 'presentation')
})

tabButtons?.forEach((tab, index) => {
  tab.setAttribute('role', 'tab')
  if (index == 0) {
    tab.setAttribute('aria-selected', 'true')
  } else {
    tab.setAttribute('tabindex', '-1')
    tabPanels?.[index]?.setAttribute('hidden', '')
  }
})

tabPanels?.forEach(panel => {
  panel.setAttribute('role', 'tabpanel')
  panel.setAttribute('tabindex', '0')
})

tabsContainer?.addEventListener('click', e => {
  e.preventDefault()

  const clickedTab = (e.target as Element | null)?.closest('a')

  switchTab(clickedTab)
})

tabsContainer?.addEventListener('keydown', e => {
  switch ((e as KeyboardEvent).key) {
    case 'ArrowRight': {
      moveRightTab()
      break
    }
    case 'ArrowLeft': {
      moveLeftTab()
      break
    }
  }
})

function moveLeftTab() {
  const currentTab = document.activeElement

  if (!currentTab?.parentElement?.previousElementSibling) {
    switchTab(tabButtons?.[tabButtons.length - 1])
  } else {
    switchTab(
      currentTab.parentElement?.previousElementSibling?.querySelector('a'),
    )
  }
}

function moveRightTab() {
  const currentTab = document.activeElement

  if (!currentTab?.parentElement?.nextElementSibling) {
    switchTab(tabButtons?.[0])
  } else {
    switchTab(currentTab.parentElement?.nextElementSibling?.querySelector('a'))
  }
}

function switchTab(newTab: HTMLAnchorElement | null | undefined) {
  if (!newTab) return

  const activePanelId = newTab.getAttribute('href')!
  const activePanel = tabsContainer?.querySelector(activePanelId)

  tabButtons?.forEach(button => {
    button.setAttribute('aria-selected', 'false')
    button.setAttribute('tabindex', '-1')
  })

  tabPanels?.forEach(panel => {
    panel.setAttribute('hidden', 'true')
  })
  activePanel?.removeAttribute('hidden')

  newTab.setAttribute('aria-selected', 'true')
  newTab.setAttribute('tabindex', '0')
  newTab.focus()
}
