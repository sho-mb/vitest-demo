import { expect, test } from 'vitest'

function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0)
}

test('1 + 2 + 3', () => {
  expect(sum(1, 2, 3)).toEqual(6)
})


test('1 + 1', () => {
  expect(sum(1 + 1)).toEqual(2)
})

test('10 num', () => {
  expect(sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)).toEqual(55);
})

test('1 num', () => {
  expect(sum(100)).toEqual(100);
})

test('0 num', () => {
  expect(sum()).toEqual(0);
})