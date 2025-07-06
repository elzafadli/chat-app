import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ChatComponent from './ChatComponent.vue'

describe('ChatComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(ChatComponent)
    expect(wrapper.text()).toContain('Dahlia52')
  })
})
