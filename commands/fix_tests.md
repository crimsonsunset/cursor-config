# fix_tests

Fix or remove failing tests in this repo following this methodical process:

## Process

1. Run the entire test suite with `yarn test` or `npm test` to see which files need work
2. Move to the first failing test FILE. Until done with it, only run this test file, not the whole suite
   - 2a. Read the corresponding source code file you are writing tests for
3. Work on the first failing test BLOCK (a singular `it` block)
   - If the block no longer reflects the functionality of the component, update the test accordingly
4. Try to fix that one `it` block up to 3 times
   - After 3 attempts if the `it` block is still failing, delete it from the file
5. Go to step 3, using the next failing test BLOCK
   - Repeat until all test BLOCKS in this file have been fixed or deleted
6. Move to the next failing test FILE
7. Repeat steps 1-6 until all tests are passing or removed

## Important Constraints

- All components are working as intended - only the tests may be out of date
- Do NOT make changes to components unless absolutely necessary
- Definitely do NOT change functionality
- Only fix failures, not warnings
- Do not explain what you're doing or ask to continue
- Just work through it systematically until stopped





