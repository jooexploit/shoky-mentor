name: Pull Request
description: Submit changes to the project
body:

- type: markdown
  attributes:
  value: |
  Thanks for contributing to Frontend Tools Hub! Please fill out this template to help us review your changes.

- type: textarea
  id: description
  attributes:
  label: Description
  description: Provide a clear description of what this PR does
  placeholder: "This PR adds..."
  validations:
  required: true

- type: dropdown
  id: type
  attributes:
  label: Type of Change
  description: What type of change is this?
  options: - Bug fix (non-breaking change which fixes an issue) - New feature (non-breaking change which adds functionality)  
   - Breaking change (fix or feature that would cause existing functionality to not work as expected) - Documentation update - Style/UI improvement - Performance optimization - Code refactoring - Tool addition
  validations:
  required: true

- type: textarea
  id: testing
  attributes:
  label: Testing
  description: Describe how you tested your changes
  placeholder: "I tested this by..."
  validations:
  required: true

- type: checkboxes
  id: browser-testing
  attributes:
  label: Browser Testing
  description: Which browsers have you tested this on?
  options: - label: Chrome - label: Firefox - label: Safari - label: Edge - label: Mobile browsers

- type: checkboxes
  id: checklist
  attributes:
  label: Checklist
  description: Please confirm you have completed these steps
  options: - label: My code follows the style guidelines of this project
  required: true - label: I have performed a self-review of my own code
  required: true - label: I have commented my code, particularly in hard-to-understand areas - label: I have made corresponding changes to the documentation - label: My changes generate no new warnings or errors
  required: true - label: I have tested my changes on multiple browsers/devices - label: Any dependent changes have been merged and published

- type: textarea
  id: screenshots
  attributes:
  label: Screenshots (if applicable)
  description: Add screenshots to help explain your changes

- type: textarea
  id: additional-notes
  attributes:
  label: Additional Notes
  description: Any additional information or context about this PR
