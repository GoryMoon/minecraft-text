import { describe, expect, test } from '@jest/globals';
import { camelToSnakeCase } from '../utils';

describe('camelCase -> snake_case', () => {
  test('single simple word', () => {
    expect(camelToSnakeCase('test')).toBe('test');
  });

  test('two simple words', () => {
    expect(camelToSnakeCase('test test')).toBe('test test');
  });

  test('single combined word', () => {
    expect(camelToSnakeCase('helloWorld')).toBe('hello_world');
  });

  test('two combined words', () => {
    expect(camelToSnakeCase('helloWorld sayHello')).toBe(
      'hello_world say_hello'
    );
  });

  test('single long word', () => {
    expect(camelToSnakeCase('helloWorldThereGoodSir')).toBe(
      'hello_world_there_good_sir'
    );
  });
});
