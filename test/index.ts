import { test } from '@substrate-system/tapzero'
import { waitFor } from '@substrate-system/dom'
import '../src/index.js'

test('example test', async t => {
    document.body.innerHTML += `
        <check-box class="test">
        </check-box>
    `

    const el = await waitFor('check-box')

    t.ok(el, 'should find an element')
})
