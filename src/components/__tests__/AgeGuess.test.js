import { test, expect, beforeAll, afterEach, afterAll } from "vitest";
import { mount } from "@vue/test-utils";
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import AgeGuess from "@/AgeGuess.vue";

export const restHandlers = [
  http.get('https://api.agify.io/', async ({ request }) => {
    const req = await request.json()
    return HttpResponse.json([
      {
        age: 55,
        name: "tope"
      }
    ]).ok()
  }),
]
const server = setupServer(...restHandlers)
// Stert server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important fot test isolation`
afterEach(() => server.resetHandlers())

test("Button clicked", async () => {
  expect(AgeGuess).toBeTruthy();

  const wrapper = mount(AgeGuess, {
    props: {
      title: "Guess the users age"
    },
  });
  const verifyClick = await wrapper.get("button").trigger("click");
  expect(wrapper.vm.user.search).toEqual(null);
})

test("mount component", async () => {
  expect(AgeGuess).toBeTruthy();

  const wrapper = mount(AgeGuess, {
    props: {
      title: "Guess User Age App"
      ,
    },
  });
  expect(wrapper.text()).toContain("Guess User Age App");
})