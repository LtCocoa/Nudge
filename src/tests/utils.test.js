import { describe, expect, test } from "vitest";
import { formatDate, fillMonth } from "../utils";

describe('Date tests', () => {
  test('Date is formatted', () => {
    expect(formatDate(new Date(2024, 7, 15, 22, 30, 15))).toBe(`15.07.2024 22:30`);
  });

  test('Calendar dates for months are filled', () => {
    const monthDates = [
      ...Array.from({length: 31}, (_, i) => i + 1).map(item => new Date(2024, 6, item)),
       ...[1, 2, 3, 4].map(item => new Date(2024, 7, item))
    ];
    expect(fillMonth(2024, 6)).toEqual(expect.arrayContaining(monthDates));
  });
});
