# Contributing to Shoky Mentor

First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to Shoky Mentor. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Adding New Tools](#adding-new-tools)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [project-email@example.com].

### Our Pledge

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include as many details as possible.

### 💡 Suggesting Enhancements

Enhancement suggestions are welcome! Please provide clear use cases and explain how the enhancement would benefit users.

### 🛠️ Code Contributions

- Fix bugs
- Implement new features
- Improve documentation
- Add new tools to the database
- Enhance UI/UX design
- Optimize performance

### 📖 Documentation

Help improve our documentation by:

- Fixing typos and grammar
- Adding examples
- Clarifying instructions
- Translating content

## Getting Started

### Prerequisites

- Git
- A modern web browser
- Text editor (VS Code recommended)
- Basic knowledge of HTML, CSS, and JavaScript

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

   ```bash
   git clone https://github.com/YOUR-USERNAME/shoky-mentor.git
   cd shoky-mentor
   ```

3. Add the original repository as upstream:
   ```bash
   git remote add upstream https://github.com/jooexploit/shoky-mentor.git
   ```

### Local Development Setup

1. Open `index.html` in your browser or use a local server:

   ```bash
   # Using Python
   python -m http.server 3000

   # Using Node.js
   npx http-server -p 3000
   ```

2. Make your changes
3. Test thoroughly across different browsers and devices

## Development Workflow

### Branch Naming Convention

- `feature/description` - for new features
- `bugfix/description` - for bug fixes
- `docs/description` - for documentation updates
- `refactor/description` - for code refactoring
- `style/description` - for UI/style improvements

Example: `feature/add-tool-rating-system`

### Making Changes

1. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our style guidelines

3. Test your changes thoroughly

4. Commit your changes:

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. Push to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request

## Style Guidelines

### HTML Guidelines

- Use semantic HTML5 elements
- Include proper ARIA labels for accessibility
- Maintain consistent indentation (2 spaces)
- Use descriptive class names
- Validate HTML using W3C validator

```html
<!-- Good -->
<section class="tools-section" aria-label="Frontend tools collection">
  <h2 class="section-title">Tools</h2>
  <!-- content -->
</section>

<!-- Avoid -->
<div class="sec">
  <h2>Tools</h2>
  <!-- content -->
</div>
```

### CSS Guidelines

- Use CSS custom properties for theming
- Follow mobile-first responsive design
- Use meaningful class names (BEM-like naming)
- Group related properties together
- Comment complex CSS rules

```css
/* Good */
.tool-card {
  --card-bg: var(--surface-color);
  --card-shadow: var(--shadow-color);

  background: var(--card-bg);
  border-radius: var(--border-radius-md);
  box-shadow: var(--card-shadow);
  padding: var(--spacing-md);
  transition: transform 0.2s ease;
}

.tool-card:hover {
  transform: translateY(-2px);
}
```

### JavaScript Guidelines

- Use ES6+ features
- Write descriptive variable and function names
- Add comments for complex logic
- Handle errors gracefully
- Use `const` and `let` instead of `var`

```javascript
// Good
const filterToolsByCategory = (tools, category) => {
  if (!Array.isArray(tools) || !category) {
    return tools;
  }

  return tools.filter(
    (tool) => tool.category === category || category === "all"
  );
};

// Avoid
function filter(t, c) {
  return t.filter((x) => x.category === c);
}
```

### Accessibility Guidelines

- Include alt text for images
- Use proper heading hierarchy
- Ensure sufficient color contrast
- Make interactive elements keyboard accessible
- Test with screen readers

## Commit Messages

We follow the [Conventional Commits](https://conventionalcommits.org/) specification:

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

### Examples

```bash
feat: add tool rating system
fix: resolve mobile navigation issue
docs: update installation instructions
style: improve card hover animations
refactor: optimize search algorithm
```

## Pull Request Process

### Before Submitting

- [ ] Test your changes thoroughly
- [ ] Update documentation if needed
- [ ] Follow the style guidelines
- [ ] Write descriptive commit messages
- [ ] Ensure no console errors

### PR Description Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Style/UI improvement
- [ ] Performance optimization

## Testing

- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari
- [ ] Tested on mobile devices
- [ ] Tested accessibility features

## Screenshots (if applicable)

[Add screenshots here]

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
```

### Review Process

1. Automated checks will run on your PR
2. Maintainers will review your code
3. Address any feedback or requested changes
4. Once approved, your PR will be merged

## Adding New Tools

### Tool Data Structure

When adding new tools to `script.js`, follow this structure:

```javascript
{
  id: 46,                                    // Next available ID
  name: "Tool Name",                         // Official tool name
  description: "Brief tool description",      // 1-2 sentences
  url: "https://example.com",               // Official website
  icon: "fas fa-icon-name",                 // Font Awesome icon
  category: "css-tools",                    // Category slug
  popularity: 85,                           // Score 1-100
  tags: ["css", "generator", "design"],     // Search keywords
  featured: false,                          // Optional: highlight tool
  new: false                               // Optional: mark as new
}
```

### Tool Categories

- `games` - Educational games and interactive learning
- `css-tools` - CSS generators, utilities, and helpers
- `performance` - Performance testing and optimization
- `learning` - Tutorials, documentation, and courses
- `generators` - Code generators and scaffolding tools
- `design-tools` - Design utilities and resources

### Tool Submission Guidelines

1. **Quality**: Only submit high-quality, useful tools
2. **Relevance**: Tools should be relevant to frontend development
3. **Active**: Prefer actively maintained tools
4. **Free Access**: Tools should have free access (freemium is OK)
5. **No Spam**: Don't submit your own tools without disclosure

### Tool Review Criteria

- ✅ Useful for frontend developers
- ✅ Good user interface and experience
- ✅ Active development/maintenance
- ✅ Proper documentation
- ✅ No broken links or major bugs

## Reporting Bugs

### Before Reporting

- Check existing issues to avoid duplicates
- Test on multiple browsers if possible
- Clear browser cache and try again

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Desktop (please complete):**

- OS: [e.g. iOS]
- Browser [e.g. chrome, safari]
- Version [e.g. 22]

**Smartphone (please complete):**

- Device: [e.g. iPhone6]
- OS: [e.g. iOS8.1]
- Browser [e.g. stock browser, safari]
- Version [e.g. 22]

**Additional context**
Any other context about the problem.
```

## Suggesting Features

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions you've considered.

**Additional context**
Screenshots, mockups, or examples.

**Implementation ideas**
If you have technical suggestions.
```

## Questions?

If you have questions that aren't covered in this guide:

1. Check existing [GitHub Issues](https://github.com/jooexploit/shoky-mentor/issues)
2. Create a new [Discussion](https://github.com/jooexploit/shoky-mentor/discussions)
3. Contact maintainers directly

## Recognition

Contributors will be recognized in:

- README.md contributors section
- GitHub contributors graph
- Release notes for significant contributions

Thank you for contributing to Shoky Mentor! 🚀
