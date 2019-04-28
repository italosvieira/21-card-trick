import {mount} from '@vue/test-utils';
import CardTrick from '@/component/CardTrick.vue';

describe('CardTrick.vue', () => {
  test('Is a Vue instance', () => {
    expect(mount(CardTrick).isVueInstance()).toBeTruthy();
  });
});
