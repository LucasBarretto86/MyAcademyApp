// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

beforeEach(() => {
  const modal = document.createElement('div')
  modal.id = 'modal'
  document.body.appendChild(modal)

  const root = document.createElement('div')
  root.id = 'root'
  document.body.appendChild(root)
})

afterEach(() => {
  document.body.innerHTML = ''
})


process.on('unhandledRejection', (err) => {
  throw err
})
