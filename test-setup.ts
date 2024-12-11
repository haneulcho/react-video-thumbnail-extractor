import '@testing-library/jest-dom/vitest'
import { act, cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// https://testing-library.com/docs/react-testing-library/api#cleanup
afterEach(() => cleanup())
