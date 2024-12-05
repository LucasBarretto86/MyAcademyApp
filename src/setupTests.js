// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

beforeEach(() => {
  const modalsDiv = document.createElement('div')
  modalsDiv.id = 'modals'
  document.body.appendChild(modalsDiv)

  const rootDiv = document.createElement('div')
  rootDiv.id = 'root'
  document.body.appendChild(rootDiv)
})

afterEach(() => {
  document.body.innerHTML = ''
})
