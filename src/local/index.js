import { localize } from 'vee-validate'

localize({
  zh: {
    messages: {
      // generic rule messages...
    },
    fields: {
      username: {
        required: 'Password cannot be empty!',
        max: 'Are you really going to remember that?',
        min: 'Too few, you want to get doxed?'
      },
      password: {
        required: 'Password cannot be empty!',
        max: 'Are you really going to remember that?',
        min: 'Too few, you want to get doxed?'
      }
    }
  }
})
