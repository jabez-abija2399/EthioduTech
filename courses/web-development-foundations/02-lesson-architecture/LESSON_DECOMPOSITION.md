# Lesson Decomposition (Capability-Driven Rebuild)

This document details the pedagogical reasoning behind the decomposition of all 49 modules into discrete learning experiences. 
Time-based algorithms and generic templates have been strictly avoided.

## mod-web-01 — First Contact With the Web

### Primary Capability
Create, open, and view a basic HTML file locally in a web browser without a server.

### Supporting Skills
skill-web-roles

### Concept Clusters


### Lesson Boundaries

#### Viewing Your First HTML File
- **Purpose**: Show immediate, visible success by opening a local HTML file.
- **Objective**: Open a local HTML file in a web browser without a server.
- **Skills**: skill-web-roles
- **Concepts**: 
- **Learner Action / Practice**: Open file, View result
- **Scaffolding**: WE DO
- **Estimated Workload**: 30 minutes
- **Boundary Rationale**: First-win design. The learner must see that they can control the browser immediately without theory.

## mod-web-02 — How the Web Works

### Primary Capability
Explain the URL request and response cycle, identifying the roles of the DNS, server, and browser.

### Supporting Skills
skill-url-anatomy, skill-http-basics

### Concept Clusters
con-web-01

### Lesson Boundaries

#### The Anatomy of a URL
- **Purpose**: Understand how web addresses point to resources.
- **Objective**: Identify the scheme, domain, and path of a given URL.
- **Skills**: skill-url-anatomy, skill-http-basics
- **Concepts**: con-web-01
- **Learner Action / Practice**: Identify URL parts
- **Scaffolding**: YOU DO WITH SUPPORT
- **Estimated Workload**: 30 minutes
- **Boundary Rationale**: Distinct cognitive model from the general request cycle.

#### How the Browser Fetches Pages
- **Purpose**: Mental model of the Client-Server relationship.
- **Objective**: Explain the URL request and response cycle, identifying the roles of the DNS, server, and browser.
- **Skills**: skill-url-anatomy, skill-http-basics
- **Concepts**: con-web-01
- **Learner Action / Practice**: Trace request cycle
- **Scaffolding**: YOU DO WITH SUPPORT
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Requires a separate mental model of the network vs the address itself.

## mod-web-03 — HTML, CSS and JavaScript Together

### Primary Capability
Identify whether HTML, CSS, or JavaScript is responsible for a given structural, visual, or behavioral web feature.

### Supporting Skills
skill-web-roles

### Concept Clusters
con-web-02

### Lesson Boundaries

#### HTML, CSS, and JavaScript Roles
- **Purpose**: Differentiate the three core web languages.
- **Objective**: Identify whether HTML, CSS, or JavaScript is responsible for a given structural, visual, or behavioral web feature.
- **Skills**: skill-web-roles
- **Concepts**: con-web-02
- **Learner Action / Practice**: Categorize features by language
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Essential disambiguation before learning any syntax. Combines concept and diagnostic practice.

## mod-web-04 — Developer Environment and Browser Tools

### Primary Capability
Use browser developer tools to inspect DOM elements, modify styles temporarily, and view console output.

### Supporting Skills
skill-js-debug

### Concept Clusters


### Lesson Boundaries

#### Inspecting the Web
- **Purpose**: First introduction to Developer Tools.
- **Objective**: Use browser developer tools to inspect DOM elements.
- **Skills**: skill-js-debug
- **Concepts**: 
- **Learner Action / Practice**: Inspect elements
- **Scaffolding**: WE DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Tooling boundary. Requires interactive use of the browser.

#### Modifying Live Pages
- **Purpose**: Empowerment through DevTools.
- **Objective**: Modify styles temporarily and view console output.
- **Skills**: skill-js-debug
- **Concepts**: 
- **Learner Action / Practice**: Edit live DOM
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Practice boundary. Separates inspection from active modification.

## mod-html-01 — HTML Mental Model and Document Structure

### Primary Capability
Construct a valid HTML5 document skeleton including DOCTYPE, html, head, title, and body tags.

### Supporting Skills
skill-html-scaffold, skill-html-tags

### Concept Clusters
con-html-01

### Lesson Boundaries

#### The HTML Skeleton
- **Purpose**: Learn the mandatory document structure.
- **Objective**: Construct a valid HTML5 document skeleton including DOCTYPE, html, head, title, and body tags.
- **Skills**: skill-html-scaffold, skill-html-tags
- **Concepts**: con-html-01
- **Learner Action / Practice**: Construct skeleton
- **Scaffolding**: WE DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Foundational structure needed before any content can be added.

#### Validating HTML
- **Purpose**: Introduce W3C validation early.
- **Objective**: Verify an HTML document passes W3C validation for a basic skeleton.
- **Skills**: skill-html-scaffold, skill-html-tags
- **Concepts**: con-html-01
- **Learner Action / Practice**: Fix validation errors
- **Scaffolding**: YOU DO
- **Estimated Workload**: 30 minutes
- **Boundary Rationale**: Debugging boundary. Teaches how to find syntax errors in the skeleton.

## mod-html-02 — Text, Headings and Content

### Primary Capability
Format text content using appropriate heading hierarchies and paragraph tags to create readable documents.

### Supporting Skills
skill-html-tags

### Concept Clusters


### Lesson Boundaries

#### Structuring Text with Headings and Paragraphs
- **Purpose**: Format basic text content.
- **Objective**: Format text content using appropriate heading hierarchies and paragraph tags.
- **Skills**: skill-html-tags
- **Concepts**: 
- **Learner Action / Practice**: Structure text
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Semantic text content represents a distinct capability from document skeleton.

## mod-html-03 — Links, Paths and Navigation

### Primary Capability
Connect multiple HTML documents together using anchor tags with correct relative and absolute file paths.

### Supporting Skills
skill-html-links

### Concept Clusters


### Lesson Boundaries

#### Linking Pages Together
- **Purpose**: Create the web's defining feature: hyperlinks.
- **Objective**: Connect multiple HTML documents together using anchor tags.
- **Skills**: skill-html-links
- **Concepts**: 
- **Learner Action / Practice**: Create links
- **Scaffolding**: WE DO
- **Estimated Workload**: 30 minutes
- **Boundary Rationale**: New capability: Interaction/navigation vs static text.

#### Navigating File Paths
- **Purpose**: Understand absolute vs relative paths.
- **Objective**: Construct correct relative and absolute file paths for local files.
- **Skills**: skill-html-links
- **Concepts**: 
- **Learner Action / Practice**: Write relative paths
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Cognitive load boundary. Paths are abstract and require dedicated practice separate from the anchor tag syntax.

## mod-html-04 — Lists, Images and Media

### Primary Capability
Embed images and structure content into ordered and unordered lists.

### Supporting Skills
skill-html-media

### Concept Clusters


### Lesson Boundaries

#### Structuring Lists
- **Purpose**: Organize items.
- **Objective**: Structure content into ordered and unordered lists.
- **Skills**: skill-html-media
- **Concepts**: 
- **Learner Action / Practice**: Write lists
- **Scaffolding**: YOU DO
- **Estimated Workload**: 30 minutes
- **Boundary Rationale**: Parent-child tag relationship practice.

#### Embedding Images
- **Purpose**: Add media.
- **Objective**: Embed images using the img tag and alt attributes.
- **Skills**: skill-html-media
- **Concepts**: 
- **Learner Action / Practice**: Embed images, Add alt text
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Self-closing tags and attributes are a distinct conceptual shift from lists.

## mod-html-05 — Semantic Structure

### Primary Capability
Build a semantically structured HTML document using appropriate landmarks like header, main, article, and nav.

### Supporting Skills
skill-semantic-markup

### Concept Clusters
con-html-02

### Lesson Boundaries

#### Semantic Landmarks
- **Purpose**: Improve document meaning.
- **Objective**: Build a semantically structured HTML document using header, main, article, and nav.
- **Skills**: skill-semantic-markup
- **Concepts**: con-html-02
- **Learner Action / Practice**: Replace divs with semantic tags
- **Scaffolding**: YOU DO WITH SUPPORT
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Conceptual shift from 'how it looks' to 'what it means'. Requires dedicated reasoning practice.

## mod-html-06 — Tables and Structured Data

### Primary Capability
Display tabular data using HTML table, tr, th, and td elements.

### Supporting Skills
skill-html-tags

### Concept Clusters


### Lesson Boundaries

#### Building Data Tables
- **Purpose**: Display tabular data.
- **Objective**: Display tabular data using HTML table, tr, th, and td elements.
- **Skills**: skill-html-tags
- **Concepts**: 
- **Learner Action / Practice**: Construct a grid of data
- **Scaffolding**: WE DO
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Tables require a complex nested mental model different from simple lists.

## mod-html-07 — Forms

### Primary Capability
Construct a functional HTML form with varied input types, labels, and a submit button.

### Supporting Skills
skill-html-forms

### Concept Clusters


### Lesson Boundaries

#### Creating Forms
- **Purpose**: Capture user input.
- **Objective**: Construct a functional HTML form with varied input types.
- **Skills**: skill-html-forms
- **Concepts**: 
- **Learner Action / Practice**: Write form inputs
- **Scaffolding**: WE DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Interactive capability shift. Inputs are the first interactive elements taught.

#### Labels and Submission
- **Purpose**: Make forms usable and accessible.
- **Objective**: Link labels to inputs and implement a submit button.
- **Skills**: skill-html-forms
- **Concepts**: 
- **Learner Action / Practice**: Link labels, Add submit
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Accessibility and form state management boundary.

## mod-html-08 — Accessibility and Document Quality

### Primary Capability
Identify and fix common structural accessibility violations including missing alt text and unlinked form labels.

### Supporting Skills
skill-html-a11y

### Concept Clusters
con-html-03

### Lesson Boundaries

#### Diagnosing Accessibility Issues
- **Purpose**: Audit existing code.
- **Objective**: Identify structural accessibility violations including missing alt text and unlinked form labels.
- **Skills**: skill-html-a11y
- **Concepts**: con-html-03
- **Learner Action / Practice**: Audit code
- **Scaffolding**: YOU DO WITH SUPPORT
- **Estimated Workload**: 30 minutes
- **Boundary Rationale**: Diagnostic boundary. Finding errors is different from writing correct code.

#### Fixing Accessibility Violations
- **Purpose**: Correct existing code.
- **Objective**: Fix common structural accessibility violations to pass a basic audit.
- **Skills**: skill-html-a11y
- **Concepts**: con-html-03
- **Learner Action / Practice**: Fix alt text, Fix labels
- **Scaffolding**: YOU DO
- **Estimated Workload**: 30 minutes
- **Boundary Rationale**: Application boundary. Fixing the issues identified in the audit.

## mod-html-09 — Multi-Page Website Project

### Primary Capability
Synthesize HTML tags, semantics, paths, and forms to build a fully linked multi-page website from scratch.

### Supporting Skills
skill-html-scaffold, skill-semantic-markup

### Concept Clusters
con-html-01

### Lesson Boundaries

#### Planning a Multi-Page Site
- **Purpose**: Project architecture.
- **Objective**: Plan the structure and paths for a multi-page website.
- **Skills**: skill-html-scaffold, skill-semantic-markup
- **Concepts**: con-html-01
- **Learner Action / Practice**: Plan site architecture
- **Scaffolding**: YOU DO WITH SUPPORT
- **Estimated Workload**: 30 minutes
- **Boundary Rationale**: Project boundary. Planning precedes implementation.

#### Building the Multi-Page Site
- **Purpose**: Project execution.
- **Objective**: Synthesize HTML tags, semantics, paths, and forms to build a fully linked multi-page website.
- **Skills**: skill-html-scaffold, skill-semantic-markup
- **Concepts**: con-html-01
- **Learner Action / Practice**: Build site
- **Scaffolding**: YOU DO
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Project build boundary. Complete independent synthesis.

## mod-css-01 — CSS Mental Model

### Primary Capability
Target specific HTML elements using type, class, and ID selectors to apply basic styling rules.

### Supporting Skills
skill-css-selectors, skill-css-cascade

### Concept Clusters
con-css-01

### Lesson Boundaries

#### Applying Basic Styles
- **Purpose**: First CSS interaction.
- **Objective**: Target specific HTML elements using type, class, and ID selectors to apply basic styling rules.
- **Skills**: skill-css-selectors, skill-css-cascade
- **Concepts**: con-css-01
- **Learner Action / Practice**: Write basic CSS rules
- **Scaffolding**: WE DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: New language introduction. Focus on the selector syntax.

#### Understanding the Cascade
- **Purpose**: Mental model of CSS application.
- **Objective**: Predict which CSS rule will apply based on specificity and the cascade.
- **Skills**: skill-css-selectors, skill-css-cascade
- **Concepts**: con-css-01
- **Learner Action / Practice**: Predict CSS outcomes
- **Scaffolding**: YOU DO WITH SUPPORT
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Cognitive boundary. Specificity requires its own reasoning exercises distinct from syntax.

## mod-css-02 — Values, Color and Typography

### Primary Capability
Style text using fonts, sizing, weights, and accessible color combinations.

### Supporting Skills
skill-css-selectors

### Concept Clusters


### Lesson Boundaries

#### Styling Typography
- **Purpose**: Control text appearance.
- **Objective**: Style text using fonts, sizing, and weights.
- **Skills**: skill-css-selectors
- **Concepts**: 
- **Learner Action / Practice**: Style fonts
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Visual formatting capability.

#### Accessible Colors
- **Purpose**: Color contrast and usability.
- **Objective**: Apply accessible color combinations to text and backgrounds.
- **Skills**: skill-css-selectors
- **Concepts**: 
- **Learner Action / Practice**: Apply contrast-safe colors
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Accessibility boundary. Requires understanding contrast ratios.

## mod-css-03 — Box Model, Spacing and Flow

### Primary Capability
Manipulate the dimensions and spacing of elements using margin, border, padding, and box-sizing.

### Supporting Skills
skill-box-model

### Concept Clusters
con-css-02

### Lesson Boundaries

#### The CSS Box Model
- **Purpose**: Mental model of element sizing.
- **Objective**: Manipulate the dimensions of elements using margin, border, and padding.
- **Skills**: skill-box-model
- **Concepts**: con-css-02
- **Learner Action / Practice**: Adjust margins and padding
- **Scaffolding**: WE DO
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Crucial mental model shift. The foundation of all layout.

#### Controlling Box Sizing
- **Purpose**: Predictable layout math.
- **Objective**: Apply box-sizing to control how padding affects element width.
- **Skills**: skill-box-model
- **Concepts**: con-css-02
- **Learner Action / Practice**: Use border-box
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Nuanced control over the box model requiring dedicated practice.

## mod-css-04 — Display and Positioning

### Primary Capability
Control document flow using block, inline, and inline-block, as well as absolute/relative positioning.

### Supporting Skills
skill-box-model

### Concept Clusters


### Lesson Boundaries

#### Document Flow and Display Types
- **Purpose**: Control element flow.
- **Objective**: Control document flow using block, inline, and inline-block.
- **Skills**: skill-box-model
- **Concepts**: 
- **Learner Action / Practice**: Change display types
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Flow is distinct from positioning. Focuses on natural browser behavior.

#### Absolute and Relative Positioning
- **Purpose**: Break out of normal flow.
- **Objective**: Position elements using absolute and relative positioning.
- **Skills**: skill-box-model
- **Concepts**: 
- **Learner Action / Practice**: Position elements
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Positioning breaks natural flow, requiring a separate mental model.

## mod-css-05 — Flexbox

### Primary Capability
Build and adjust one-dimensional layouts using Flexbox alignment, direction, sizing, wrapping, and spacing.

### Supporting Skills
skill-flexbox

### Concept Clusters
con-css-03

### Lesson Boundaries

#### Introduction to Flexbox
- **Purpose**: One-dimensional layout basics.
- **Objective**: Create a flex container and align items along the main axis.
- **Skills**: skill-flexbox
- **Concepts**: con-css-03
- **Learner Action / Practice**: Use display: flex, justify-content
- **Scaffolding**: WE DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: New layout system introduction.

#### Advanced Flexbox Alignment
- **Purpose**: Full control over flex items.
- **Objective**: Adjust Flexbox alignment, direction, sizing, wrapping, and spacing.
- **Skills**: skill-flexbox
- **Concepts**: con-css-03
- **Learner Action / Practice**: Use flex-wrap, align-items, flex-grow
- **Scaffolding**: YOU DO
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Complex properties require independent practice.

## mod-css-06 — Grid

### Primary Capability
Construct two-dimensional layouts using CSS Grid templates, tracks, and areas.

### Supporting Skills
skill-css-grid

### Concept Clusters


### Lesson Boundaries

#### Defining CSS Grids
- **Purpose**: Two-dimensional layout basics.
- **Objective**: Construct a basic CSS Grid using templates and tracks.
- **Skills**: skill-css-grid
- **Concepts**: 
- **Learner Action / Practice**: Define grid tracks
- **Scaffolding**: WE DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: New layout system. Different mental model from Flexbox.

#### Placing Grid Items
- **Purpose**: Control placement within the grid.
- **Objective**: Place elements within specific grid areas.
- **Skills**: skill-css-grid
- **Concepts**: 
- **Learner Action / Practice**: Place items in grid areas
- **Scaffolding**: YOU DO
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Item placement is a distinct capability from defining the grid container.

## mod-css-07 — Responsive Design

### Primary Capability
Adapt layouts to different screen sizes using media queries and fluid sizing units.

### Supporting Skills
skill-media-queries

### Concept Clusters


### Lesson Boundaries

#### Media Queries
- **Purpose**: Adapt to screen sizes.
- **Objective**: Adapt layouts to different screen sizes using media queries.
- **Skills**: skill-media-queries
- **Concepts**: 
- **Learner Action / Practice**: Write media queries
- **Scaffolding**: YOU DO
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Responsive capability. Requires testing across viewport sizes.

#### Fluid Units
- **Purpose**: Scalable sizing.
- **Objective**: Implement fluid sizing using relative units (%, vh, vw, rem).
- **Skills**: skill-media-queries
- **Concepts**: 
- **Learner Action / Practice**: Use fluid units
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Distinct mathematical approach to sizing compared to static pixels.

## mod-css-08 — Accessibility and Design for Developers

### Primary Capability
Ensure interfaces remain usable by maintaining focus outlines and legible contrast ratios.

### Supporting Skills
skill-html-a11y

### Concept Clusters


### Lesson Boundaries

#### Focus and Keyboard Accessibility
- **Purpose**: Ensure interface usability.
- **Objective**: Ensure interfaces remain usable by maintaining focus outlines.
- **Skills**: skill-html-a11y
- **Concepts**: 
- **Learner Action / Practice**: Manage focus outlines
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Accessibility focus. Requires testing via keyboard navigation.

## mod-css-09 — Responsive Interface Project

### Primary Capability
Synthesize selectors, box model, layout, and queries to transform a design brief into a responsive webpage.

### Supporting Skills
skill-flexbox, skill-box-model, skill-media-queries

### Concept Clusters
con-css-02, con-css-03

### Lesson Boundaries

#### Planning the Responsive Interface
- **Purpose**: Project architecture.
- **Objective**: Plan the layout transitions for a responsive webpage design.
- **Skills**: skill-flexbox, skill-box-model, skill-media-queries
- **Concepts**: con-css-02, con-css-03
- **Learner Action / Practice**: Map breakpoints
- **Scaffolding**: YOU DO WITH SUPPORT
- **Estimated Workload**: 30 minutes
- **Boundary Rationale**: Project boundary. Planning precedes implementation.

#### Building the Responsive Interface
- **Purpose**: Project execution.
- **Objective**: Synthesize selectors, box model, layout, and queries to transform a design brief into a responsive webpage.
- **Skills**: skill-flexbox, skill-box-model, skill-media-queries
- **Concepts**: con-css-02, con-css-03
- **Learner Action / Practice**: Build responsive layout
- **Scaffolding**: YOU DO
- **Estimated Workload**: 75 minutes
- **Boundary Rationale**: Project build boundary. Complete independent synthesis.

## mod-js-01 — Programming Thinking

### Primary Capability
Translate a human-readable problem into a logical sequence of discrete steps (pseudocode).

### Supporting Skills
skill-problem-decomposition

### Concept Clusters


### Lesson Boundaries

#### Thinking Like a Programmer
- **Purpose**: Problem decomposition.
- **Objective**: Translate a human-readable problem into a logical sequence of discrete steps (pseudocode).
- **Skills**: skill-problem-decomposition
- **Concepts**: 
- **Learner Action / Practice**: Write pseudocode
- **Scaffolding**: YOU DO
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Crucial shift to algorithmic thinking before learning any syntax.

## mod-js-02 — Variables, Values and Types

### Primary Capability
Store, retrieve, and update data in memory using variables and identify basic JavaScript data types.

### Supporting Skills
skill-js-variables

### Concept Clusters
con-js-01

### Lesson Boundaries

#### Variables and Data Types
- **Purpose**: Store state.
- **Objective**: Store, retrieve, and update data in memory using variables and identify basic data types.
- **Skills**: skill-js-variables
- **Concepts**: con-js-01
- **Learner Action / Practice**: Declare and update variables
- **Scaffolding**: WE DO
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Foundational programming syntax and memory management.

## mod-js-03 — Operators and Expressions

### Primary Capability
Evaluate and manipulate data using mathematical, string, and comparison operators.

### Supporting Skills
skill-js-variables

### Concept Clusters


### Lesson Boundaries

#### Using Operators
- **Purpose**: Manipulate data.
- **Objective**: Evaluate and manipulate data using mathematical, string, and comparison operators.
- **Skills**: skill-js-variables
- **Concepts**: 
- **Learner Action / Practice**: Write expressions
- **Scaffolding**: YOU DO
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Expressions and logic are distinct from simple variable storage.

## mod-js-04 — Conditions and Decisions

### Primary Capability
Control program flow by executing different code paths using if/else statements and logic.

### Supporting Skills
skill-js-conditions

### Concept Clusters


### Lesson Boundaries

#### Writing Conditionals
- **Purpose**: Control flow.
- **Objective**: Control program flow by executing different code paths using if/else statements.
- **Skills**: skill-js-conditions
- **Concepts**: 
- **Learner Action / Practice**: Write if/else blocks
- **Scaffolding**: YOU DO
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Branching logic introduces non-linear execution.

#### Complex Logic
- **Purpose**: Combine conditions.
- **Objective**: Combine multiple conditions using logical AND/OR operators.
- **Skills**: skill-js-conditions
- **Concepts**: 
- **Learner Action / Practice**: Use AND/OR operators
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Boolean logic boundary. Requires dedicated logical reasoning.

## mod-js-05 — Loops and Repetition

### Primary Capability
Automate repetitive tasks by writing loops that iterate until a specific condition is met.

### Supporting Skills
skill-js-loops

### Concept Clusters


### Lesson Boundaries

#### Writing Loops
- **Purpose**: Iteration.
- **Objective**: Automate repetitive tasks by writing loops that iterate until a specific condition is met.
- **Skills**: skill-js-loops
- **Concepts**: 
- **Learner Action / Practice**: Write for/while loops
- **Scaffolding**: YOU DO
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Iteration is a major cognitive shift in programming.

#### Tracing Loops
- **Purpose**: Mental execution of loops.
- **Objective**: Trace the execution of a loop step-by-step to predict its final output.
- **Skills**: skill-js-loops
- **Concepts**: 
- **Learner Action / Practice**: Trace loop state
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Diagnostic boundary. Reading and predicting loop state is distinct from writing one.

## mod-js-06 — Functions and Scope

### Primary Capability
Define and use JavaScript functions with parameters, return values, and appropriate scope to solve small programming problems.

### Supporting Skills
skill-js-functions

### Concept Clusters
con-js-02

### Lesson Boundaries

#### Defining Functions
- **Purpose**: Reusable code blocks.
- **Objective**: Define and invoke JavaScript functions with parameters.
- **Skills**: skill-js-functions
- **Concepts**: con-js-02
- **Learner Action / Practice**: Write functions
- **Scaffolding**: WE DO
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Abstraction capability. Encapsulating logic.

#### Return Values and Scope
- **Purpose**: Data in and out of functions.
- **Objective**: Manage function return values and identify variable scope.
- **Skills**: skill-js-functions
- **Concepts**: con-js-02
- **Learner Action / Practice**: Use return, Identify scope
- **Scaffolding**: YOU DO
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Scope and return values represent complex data flow requiring dedicated focus.

## mod-js-07 — Strings and Arrays

### Primary Capability
Store and manipulate collections of data using arrays and iterate over them safely.

### Supporting Skills
skill-js-arrays

### Concept Clusters


### Lesson Boundaries

#### Working with Arrays
- **Purpose**: Store collections.
- **Objective**: Store collections of data using arrays and access elements by index.
- **Skills**: skill-js-arrays
- **Concepts**: 
- **Learner Action / Practice**: Access array elements
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Data structure capability.

#### Iterating Arrays
- **Purpose**: Process collections.
- **Objective**: Safely iterate over arrays to transform or filter data.
- **Skills**: skill-js-arrays
- **Concepts**: 
- **Learner Action / Practice**: Loop over arrays
- **Scaffolding**: YOU DO
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Combining loops and arrays is a fundamental programming pattern.

## mod-js-08 — Objects and Data Modeling

### Primary Capability
Model complex real-world entities using JavaScript objects with key-value pairs.

### Supporting Skills
skill-js-objects

### Concept Clusters


### Lesson Boundaries

#### Creating Objects
- **Purpose**: Model real-world entities.
- **Objective**: Model complex entities using JavaScript objects with key-value pairs.
- **Skills**: skill-js-objects
- **Concepts**: 
- **Learner Action / Practice**: Create and access objects
- **Scaffolding**: YOU DO
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Key-value data structures require a different mental model from indexed arrays.

#### Nested Data Structures
- **Purpose**: Complex data access.
- **Objective**: Safely access properties within nested objects and arrays of objects.
- **Skills**: skill-js-objects
- **Concepts**: 
- **Learner Action / Practice**: Access nested data
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Complex traversal is a high-cognitive-load task common in real development.

## mod-js-09 — Debugging and Program Investigation

### Primary Capability
Systematically reproduce, isolate, diagnose, fix, and verify JavaScript errors using browser developer tools and hypothesis-driven debugging.

### Supporting Skills
skill-js-debug

### Concept Clusters


### Lesson Boundaries

#### The Debugging Process
- **Purpose**: Structured problem solving.
- **Objective**: Systematically reproduce, isolate, and diagnose JavaScript errors.
- **Skills**: skill-js-debug
- **Concepts**: 
- **Learner Action / Practice**: Isolate errors
- **Scaffolding**: WE DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Process boundary. Teaches the methodology of debugging.

#### Fixing Common Errors
- **Purpose**: Applying fixes.
- **Objective**: Fix isolated errors and verify the solution using developer tools.
- **Skills**: skill-js-debug
- **Concepts**: 
- **Learner Action / Practice**: Fix and verify code
- **Scaffolding**: YOU DO
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Application boundary. Independent resolution of varied bugs.

## mod-js-10 — DOM and Page Interaction

### Primary Capability
Select HTML elements using JavaScript and modify their text, styles, and classes.

### Supporting Skills
skill-dom-selection

### Concept Clusters
con-js-03

### Lesson Boundaries

#### Selecting DOM Elements
- **Purpose**: Connect JS to HTML.
- **Objective**: Select HTML elements using JavaScript.
- **Skills**: skill-dom-selection
- **Concepts**: con-js-03
- **Learner Action / Practice**: Query selectors
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: The bridge between logic and presentation.

#### Modifying the DOM
- **Purpose**: Dynamic visual changes.
- **Objective**: Modify the text, styles, and classes of selected DOM elements.
- **Skills**: skill-dom-selection
- **Concepts**: con-js-03
- **Learner Action / Practice**: Update text and classes
- **Scaffolding**: YOU DO
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Mutation boundary. Changing state versus just reading it.

## mod-js-11 — Events, Forms and State

### Primary Capability
Attach event listeners to UI elements to respond to user interactions and form submissions.

### Supporting Skills
skill-event-listeners

### Concept Clusters


### Lesson Boundaries

#### Handling Events
- **Purpose**: Respond to users.
- **Objective**: Attach event listeners to UI elements to respond to user interactions.
- **Skills**: skill-event-listeners
- **Concepts**: 
- **Learner Action / Practice**: Add event listeners
- **Scaffolding**: YOU DO
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Asynchronous interaction capability.

#### Managing Form State
- **Purpose**: Process user input.
- **Objective**: Capture and process form submissions dynamically without page reloads.
- **Skills**: skill-event-listeners
- **Concepts**: 
- **Learner Action / Practice**: Handle form submit
- **Scaffolding**: YOU DO
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Specific, complex event pattern crucial for web apps.

## mod-js-12 — Local Storage and Persistent Browser State

### Primary Capability
Save and retrieve serialized JavaScript objects to/from the browser's Local Storage API.

### Supporting Skills
skill-js-objects

### Concept Clusters


### Lesson Boundaries

#### Using LocalStorage
- **Purpose**: Data persistence.
- **Objective**: Save and retrieve simple data strings using the browser's LocalStorage API.
- **Skills**: skill-js-objects
- **Concepts**: 
- **Learner Action / Practice**: Set and get LocalStorage
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Persistence capability. First introduction to state surviving a refresh.

#### JSON Serialization
- **Purpose**: Persisting complex data.
- **Objective**: Convert objects and arrays to JSON for storage and parse them upon retrieval.
- **Skills**: skill-js-objects
- **Concepts**: 
- **Learner Action / Practice**: JSON stringify and parse
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Serialization boundary. Required for storing real application state.

## mod-js-13 — Async JavaScript and APIs

### Primary Capability
Fetch data from a third-party REST API, parse the JSON response, and handle loading or error states.

### Supporting Skills
skill-fetch-api

### Concept Clusters
con-js-04

### Lesson Boundaries

#### Understanding Promises and Async
- **Purpose**: Mental model of async code.
- **Objective**: Explain the concept of asynchronous execution and Promises.
- **Skills**: skill-fetch-api
- **Concepts**: con-js-04
- **Learner Action / Practice**: Predict async execution order
- **Scaffolding**: YOU DO WITH SUPPORT
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: High cognitive load topic requiring dedicated conceptual foundation.

#### Fetching API Data
- **Purpose**: Network requests.
- **Objective**: Fetch data from a third-party REST API and handle the JSON response.
- **Skills**: skill-fetch-api
- **Concepts**: con-js-04
- **Learner Action / Practice**: Use fetch API
- **Scaffolding**: YOU DO
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Network capability. Getting data into the app.

#### Handling API Errors
- **Purpose**: Robust applications.
- **Objective**: Implement error handling for failed network requests.
- **Skills**: skill-fetch-api
- **Concepts**: con-js-04
- **Learner Action / Practice**: Catch fetch errors
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Reliability boundary. Managing the unhappy path.

## mod-js-14 — Integration Project

### Primary Capability
Synthesize logic, DOM manipulation, events, and API requests to build an interactive, data-driven web application.

### Supporting Skills
skill-js-functions, skill-dom-selection, skill-event-listeners, skill-fetch-api

### Concept Clusters
con-js-03, con-js-04

### Lesson Boundaries

#### Planning the Weather Dashboard
- **Purpose**: Project architecture.
- **Objective**: Plan the state, events, and API calls for a dynamic weather app.
- **Skills**: skill-js-functions, skill-dom-selection, skill-event-listeners, skill-fetch-api
- **Concepts**: con-js-03, con-js-04
- **Learner Action / Practice**: Plan app state
- **Scaffolding**: YOU DO WITH SUPPORT
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Project boundary. Planning an integrated app.

#### Building the Weather Dashboard
- **Purpose**: Project execution.
- **Objective**: Synthesize DOM manipulation, events, state, and the Fetch API to build a fully interactive application.
- **Skills**: skill-js-functions, skill-dom-selection, skill-event-listeners, skill-fetch-api
- **Concepts**: con-js-03, con-js-04
- **Learner Action / Practice**: Build JS app
- **Scaffolding**: YOU DO
- **Estimated Workload**: 120 minutes
- **Boundary Rationale**: Project build boundary. Complete independent synthesis of JS.

## mod-git-01 — Why Version Control Exists

### Primary Capability
Explain the need for version control in tracking history and collaborating on code.

### Supporting Skills
skill-git-workflow

### Concept Clusters
con-git-01

### Lesson Boundaries

#### Initializing a Repository
- **Purpose**: Start version control.
- **Objective**: Initialize a local Git repository.
- **Skills**: skill-git-workflow
- **Concepts**: con-git-01
- **Learner Action / Practice**: git init
- **Scaffolding**: WE DO
- **Estimated Workload**: 30 minutes
- **Boundary Rationale**: Tooling introduction.

#### Staging and Committing
- **Purpose**: Save snapshots.
- **Objective**: Stage changes and create meaningful commits with descriptive messages.
- **Skills**: skill-git-workflow
- **Concepts**: con-git-01
- **Learner Action / Practice**: git add, git commit
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: The core Git workflow cycle.

## mod-git-02 — Git Local Workflow

### Primary Capability
Initialize a repository, stage file changes, and create atomic commits with descriptive messages.

### Supporting Skills
skill-git-commit, skill-git-workflow

### Concept Clusters
con-git-01

### Lesson Boundaries

#### Viewing History
- **Purpose**: Read the log.
- **Objective**: View commit history and inspect repository status.
- **Skills**: skill-git-commit, skill-git-workflow
- **Concepts**: con-git-01
- **Learner Action / Practice**: git log, git status
- **Scaffolding**: YOU DO
- **Estimated Workload**: 30 minutes
- **Boundary Rationale**: Observability capability.

#### Recovering from Mistakes
- **Purpose**: Undo actions safely.
- **Objective**: Discard uncommitted changes and unstage files safely.
- **Skills**: skill-git-commit, skill-git-workflow
- **Concepts**: con-git-01
- **Learner Action / Practice**: git checkout, git reset
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Recovery boundary. Building confidence to experiment.

## mod-git-03 — History and Recovery

### Primary Capability
View commit history logs and discard unstaged changes safely.

### Supporting Skills
skill-git-workflow

### Concept Clusters


### Lesson Boundaries

#### Working with Branches
- **Purpose**: Isolated development.
- **Objective**: Create, switch between, and manage Git branches.
- **Skills**: skill-git-workflow
- **Concepts**: 
- **Learner Action / Practice**: git branch, git checkout -b
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Branching mental model shift.

## mod-git-04 — Branches and Merge

### Primary Capability
Create, switch between, and merge isolated feature branches.

### Supporting Skills
skill-git-branch

### Concept Clusters
con-git-02

### Lesson Boundaries

#### Connecting to GitHub
- **Purpose**: Remote backup.
- **Objective**: Push local commits to a remote GitHub repository.
- **Skills**: skill-git-branch
- **Concepts**: con-git-02
- **Learner Action / Practice**: git remote, git push
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Remote networking capability.

## mod-git-05 — GitHub and Remote Repositories

### Primary Capability
Push local repositories to GitHub and clone remote repositories to a local machine.

### Supporting Skills
skill-git-workflow

### Concept Clusters


### Lesson Boundaries

#### Merging Branches
- **Purpose**: Combine work.
- **Objective**: Merge a feature branch into the main branch locally.
- **Skills**: skill-git-workflow
- **Concepts**: 
- **Learner Action / Practice**: git merge
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Integration capability.

#### Resolving Conflicts
- **Purpose**: Handle integration errors.
- **Objective**: Identify and resolve simple merge conflicts.
- **Skills**: skill-git-workflow
- **Concepts**: 
- **Learner Action / Practice**: Resolve merge conflict
- **Scaffolding**: YOU DO WITH SUPPORT
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Conflict resolution is a high cognitive load, critical debugging skill.

## mod-git-06 — Collaboration Workflow

### Primary Capability
Resolve merge conflicts and open a Pull Request for review.

### Supporting Skills
skill-github-pr

### Concept Clusters
con-git-02

### Lesson Boundaries

#### Writing Documentation
- **Purpose**: Communicate intent.
- **Objective**: Draft a clear, structured README.md using Markdown.
- **Skills**: skill-github-pr
- **Concepts**: con-git-02
- **Learner Action / Practice**: Write README
- **Scaffolding**: YOU DO
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Communication capability. Essential for project portfolios.

## mod-cap-01 — Problem and Audience

### Primary Capability
Define a specific user problem and outline the functional requirements of a web application solution.

### Supporting Skills
skill-problem-decomposition

### Concept Clusters


### Lesson Boundaries

#### Defining the Capstone Problem
- **Purpose**: Project inception.
- **Objective**: Define a clear, solvable problem and identify the target audience for the capstone project.
- **Skills**: skill-problem-decomposition
- **Concepts**: 
- **Learner Action / Practice**: Define requirements
- **Scaffolding**: YOU DECIDE
- **Estimated Workload**: 45 minutes
- **Boundary Rationale**: Complete independence on requirements gathering.

## mod-cap-02 — Planning and Design

### Primary Capability
Draft UI wireframes and document the planned data structure and API endpoints.

### Supporting Skills
skill-problem-decomposition

### Concept Clusters


### Lesson Boundaries

#### Designing the Solution
- **Purpose**: Project architecture.
- **Objective**: Draft a technical plan including UI mockups, state shape, and component structure.
- **Skills**: skill-problem-decomposition
- **Concepts**: 
- **Learner Action / Practice**: Draft tech plan
- **Scaffolding**: YOU DECIDE
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Architecture boundary before coding.

## mod-cap-03 — HTML/CSS Build

### Primary Capability
Implement the planned semantic HTML structure and responsive visual design using previously developed HTML and CSS skills.

### Supporting Skills
skill-semantic-markup, skill-flexbox

### Concept Clusters


### Lesson Boundaries

#### Building the Interface
- **Purpose**: HTML/CSS Integration.
- **Objective**: Implement the planned responsive HTML/CSS structure.
- **Skills**: skill-semantic-markup, skill-flexbox
- **Concepts**: 
- **Learner Action / Practice**: Build UI
- **Scaffolding**: YOU DECIDE
- **Estimated Workload**: 120 minutes
- **Boundary Rationale**: Visual build boundary.

## mod-cap-04 — JavaScript Build

### Primary Capability
Implement dynamic behavior, state management, and external API integrations to fulfill functional requirements.

### Supporting Skills
skill-dom-selection, skill-fetch-api

### Concept Clusters


### Lesson Boundaries

#### Implementing Logic and State
- **Purpose**: JS Integration.
- **Objective**: Implement JavaScript logic, event handling, and data fetching for the capstone.
- **Skills**: skill-dom-selection, skill-fetch-api
- **Concepts**: 
- **Learner Action / Practice**: Build Logic
- **Scaffolding**: YOU DECIDE
- **Estimated Workload**: 180 minutes
- **Boundary Rationale**: Behavioral build boundary.

## mod-cap-05 — Testing, Debugging and Accessibility

### Primary Capability
Audit the completed application for visual consistency, runtime bugs, and accessibility compliance.

### Supporting Skills
skill-js-debug, skill-html-a11y

### Concept Clusters


### Lesson Boundaries

#### Quality Assurance and Accessibility
- **Purpose**: Polishing the app.
- **Objective**: Audit the completed capstone for bugs, responsive flaws, and accessibility violations, and resolve them.
- **Skills**: skill-js-debug, skill-html-a11y
- **Concepts**: 
- **Learner Action / Practice**: Audit and fix
- **Scaffolding**: YOU DECIDE
- **Estimated Workload**: 90 minutes
- **Boundary Rationale**: QA boundary. Dedicated focus on quality over feature addition.

## mod-cap-06 — Git, GitHub and Documentation

### Primary Capability
Finalize the version history and author a comprehensive README detailing setup and architecture.

### Supporting Skills
skill-git-workflow

### Concept Clusters


### Lesson Boundaries

#### Finalizing Version Control
- **Purpose**: Deployment prep.
- **Objective**: Finalize the GitHub repository with clean commit history and comprehensive documentation.
- **Skills**: skill-git-workflow
- **Concepts**: 
- **Learner Action / Practice**: Push and Document
- **Scaffolding**: YOU DECIDE
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Publishing boundary.

## mod-cap-07 — Presentation and Reflection

### Primary Capability
Deploy the final application and synthesize the learning journey through a project presentation.

### Supporting Skills
skill-app-deployment

### Concept Clusters


### Lesson Boundaries

#### Presenting the Capstone
- **Purpose**: Communication.
- **Objective**: Deploy the project live and write a reflective summary of technical decisions.
- **Skills**: skill-app-deployment
- **Concepts**: 
- **Learner Action / Practice**: Deploy, Reflect
- **Scaffolding**: YOU DECIDE
- **Estimated Workload**: 60 minutes
- **Boundary Rationale**: Final reflection and deployment.

