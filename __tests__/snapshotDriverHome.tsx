/**
 * @jest-environment jsdom
 */

import { render, waitFor } from "@testing-library/react";
import Page from "../app/driver/home/page";
import React from 'react'

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      pathname: '/',
      query: {},
    })),
  }));

  jest.mock("aws-amplify/auth", () => ({
    fetchUserAttributes: jest.fn(() => Promise.resolve({
      "custom:role": "driver",
    })),
    getCurrentUser: jest.fn(() => Promise.resolve({
        username: "test-user",
        attributes: {
          email: "test@example.com",
        },
      })),
  }));

it("renders driver homepage unchanged", async () => {
  const { container } = render(<Page />);

    await waitFor(() => {
      expect(container).toBeTruthy(); // This triggers a wait for React updates
    });

  expect(container).toMatchSnapshot();
});