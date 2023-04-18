# Queue-UI

This codebase is a mono repository for all Queue front-end applications.

(View on bitbucket)[https://bitbucket.org/queueflow/queue-ui/]

## Getting Started

* Install root dependencies: `yarn`

* Install and symlink workspace dependencies: `lerna bootstrap`

### Running Apps

* Queue Admin v1 `yarn queue-admin [web | android | ios]` 
* Queue Admin v2 `yarn queue-admin-web start`


* Waiting Room: `yarn waiting-room-web start`

### Tools

* Run components storybook: `yarn lib-components storybook`

## Development

<!-- Coming soon. Adding workspaces and dependencies, and using plop -->

### Installing depedencies

* Install all dependencies:
	- `yarn install --legacy-peer-deps`

* Inform lerna of these dependencies:
	- `lerna bootstrap`

* Adding new dependencies
	- `yarn add {package} -W - D`
	- `lerna add {package} —-scope={name of desired package}`

* Remove dependencies
	- `yarn remove {package}`
	- `lerna remove {package} —-scope={name of desired package}`

### Creating new apps

* Creating a new Lerna package: `lerna create {name of new package}`

* Create a new Expo app (under the `/apps`): `cd apps; expo init {name of new app}`

## Amplify

- Must select a aws_profile that has access to the amplify project being used in this project
- amplify pull --appId {appId} --env {dev}




================================================================================================
## Questions
- How to do we manage local vs root packages with Lerna?
- What is --scope flag?
- Where do we add the libs to if only a few apps needed them?

## Topics to Discuss
- Turn hooks into their own module *** AND LEVERAGE LERNA FOR THIS
- Turn components in their own moudle *** AND LEVERAGE LERNA FOR THIS
- Should we use styled components so make site extremely themable & component based (can be used with materialUI lib we have: https://www.sipios.com/blog-tech/how-to-use-styled-components-with-material-ui-in-a-react-app)
- Cross device testing
- Dynamic UI architecture (combinatorics + dynamic templating + drag & drop)
- Lets move core logic of a folder out of index.tsx in order to make file switching easy. Use index name only for import & exports in the local directory
- put styles in local styles folder (neater)
- Lets create a base directory for each project
- Lets use camel-case naming convention
- TODO: CHOOSE A strategy about how to link upper level instances like Worfklow, Queue, User, etc One possibility is storing them into Cognito Attribute. Another is creating a generic like 'Strategy' and storing all upper level entities into this prime one
	- A workflow can be a type of flow. So perhaps there should be a higher level. An 'Application' level & then to have Application Instances (discuss with Princeton. For now just grab all data)
- Class and instance key naming convention
- Componenent standard (lib independent + presentational + smart distinctions + plug & play)
- Discuss project key-component dictionary
- Discuss Datalevel naming convention & validation for it | as well as parent structure
- command pattern
- Discuss amplify QA env & versioning
- Discuss feature vs Widget
- Talk about folder structures: /widgets, /layouts, /templates, /workflows, /apps ....
- Clean code + refactoring standard
- Webpack for monorepo & graphql query management 
- Webpack for base folder configuration & for graphql fragment imports
- Services folder
- Connect an sql database/store to graphql (so as to not only query from dynamoDB)

- *Think about how to create only dynamic & configurale type of UI that scales well with how we want this project to work (eg. sidebar actions - scalabale? )
- *Create a hyperlink algorithm & datastruct
- *Naming conventions (schemas, commands {action}{schema}{type} for dynamic commands  (less hardcoding))
- *In a very configurable world, we have a lot of commands. Commands can be async & occur during runtime. Important to have good stream managment, simple template interfaces, & predictable state+transitions.
- *Also good topological mapping & reconcilaiton algos for testing valid cases when things change
- *CREATE FOCUS POINTS: DYNAMIC UI (only components that scale & hook up well with design), HYPERLINKING, TOPOLOGY
- Layouts
- Dealing with custom keys
- DataLevel usage vs hardcode usage
- figure it out as you go. Just don't let app get too complex. Finish what we have THEN refactor & perfect spec
	- Wait for main features: graph mapper w/ d3 (state + topology), template builder, & chart generator
	- SQL
- Redo app structure (make a /project folder & fix webpack) 
- Flow should be: App (Get Setup, initiate via entry) => Workflow (Get Setup, initiate via entry) ... 
	- Attributes should store last updated entry (and should restore last state if different than init entry)
	- So app hyperling to tell us what state we are in our workflow(s), workflow to load & tell us where we are in our template(s), and so on...
	- Entity keys to define what parts of projet logic get triggered
- What should datalevel be used for?


## TODO:
- Review and update DataSchemas


## Optimizations
- Remove old inflated @apollo library


## Research
- Codegen with Apollo
- Subscription for waiting-room with amplify & Apollo

## Amplify
# Codegen
- amplify codegen --maxDepth 2



# Graphql
- Creating an export directive on server: https://blog.logrocket.com/creating-an-export-graphql-directive/


# AWS auth
- https://aws.amazon.com/blogs/mobile/graphql-security-appsync-amplify/
- https://medium.com/@fullstackpho/aws-amplify-multi-auth-graphql-public-read-and-authenticated-create-update-delete-1bf5443b0ad1
- https://github.com/aws-amplify/amplify-cli/issues/3802
	- PRESS SPACE TO SELECT OPTION!!
- https://docs.amplify.aws/lib/graphqlapi/authz/q/platform/js/#api-key
- https://github.com/aws-amplify/amplify-js/issues/4535


# Apollo
- To debug policies to type fields put debugger on node_modules/@apollo/client/cache/inmemory/policies.js
	- node_modules/@apollo/client/apollo-client.cjs.js
	- https://github.com/apollographql/graphql-tag

# Hooks
- Hooks are kind of meant to be reactive (or async)
- They update state when an event occurs
- They also colocate logic & make it reusable


# d3
- https://hswolff.com/blog/react-native-art-and-d3/

# Core logic concepts

- Configurations:
	- Define mappable operations. Most core ones are:
		- lifecycles, states, transitions, commands
	- Algorithm to set expected input => output and boundaries & to test (stability)

- IMPORTANT:
	- Don't abstract everything, ONLY the core part of business that needs to be adaptible and flexible. 
	- Whatever needs to scale very well & fast
	- VERY IMPORTANT to create standardized naming in this world & steps & boundaries so everything just hooks up well together: SPECIFICATION
```
config_spec = {
  // Dynamic participating entities
  entities: {
	  [key]: {...}
  }
  // flow process
  lifecycles: {
    [key]: [{ ... }] // ordered
  },  
  // state transition diagram
  states: {	
	  [key]: {...} 	// Can be specific or generic business logic state
  },     
  // valid flows between states
  transitions: {
	  [stateKey]: {..., triggerCommand, targetState}
  },
  // available commands
  commands: {
	  [key]: {...}
  },  // operations
}
```


## SPECIFICATION:
- Types
	- CamelCase
	- No plurals
	- All new types to have fields:
		- class
		- key
		- type
		- value
		- config
		- meta: [DataLevel]
		- schemas
	- All `key` fields should be unique
- Code to interface. Isolate specific logic.
- Everything to have key (app-logic map), type, value
	- This is a standardized format
- Hyperlinks to link to SetupQueries to get correct setupdata for appropriate app level component & case
- Create and resuse fragments ** bc if there is a data change it would have to be made every where


GENERIC FUNCTIONALITY NEEDED:
- Schema CRUD hook (bridge graphql client to AppEngineCore)
- Dynamic default scope field retrieval for Creation objects (like appId, workflow, etc it scopes in)
- Entity Explorer
- Make run dynamic config_spec hook/interface
- For each entity that has a lifecycle define it (like Queue: init status, pending, etc) | AKA define all possible flows very explicitly and force implementation to follow this logic


SETUP PROTOCOL:
- ${baseUrl}/unqHyperLinkId
- Retrieve HyperLink Object w/ minimal Setup Query & app logic id
- Initiate recursive tree stream that retrieves in appropriate lifecycle layer orders (eg. workflow => templates => widgets => so on...)
	- This includes data transformers
	- Data relationships


NOTE:
- How to deal w/ hyperparams (like QueueId) and app data (like statuses, data types, dropdown vals, etc)
	- Types:
		- App level data (Meta data that affects how app should function)
		- Dynamic data (Just collected for record or analysis but does not act as a structural concept to iinfluence business logic)
- Real question is: how do we encapsulate custom logic and sandbox to store apart from application?
	- By building a defined state pattern, template pattern, & extensible interface
	- Sandboxing should accomplish very specific purpose and mod logic should complete all cases in the step it is filling
	- Strict pipeline enforcing data to be correct at all stages exp from beginning so waterfall stream works correctly until very end
	- Set fallbacks/defaults in places or steps where data (or logic encapsulation) can go missing for some reason
- RouterLinkId
    - Query RouterLinkObject
    - Initiate App | Later find things to abstract to early right now to over-engineer or design wrong. Go for generic simplicity but adaptable to change
      - Template & State pattern for intiation
      - *potential future top level containers* -> App -> Workflows -> Templates -> ... -> features -> *potential other leafs* 
        - Can have other structure or a level can have other siblings (top interface will just be the initial one)

Examples of levels:
- Interface (state, observable stream map, step & process lifecycle, transition middleware (like data validations & data transformers)
	- Data structures should be very well defined & bounded (even DB structures. Tables or collection of tables should represent an overaall entity
		so we can control business flow + record traansaction record)
	- In most generic sense: any logic is nodes & edges that are deterministic (bad apps will do this wrong & complicated)
		- One edge can have multiple possibilities of being verified & confirmed f(input) = ouput >= correct_boundary
		- Each node to define its own entry requirement | each node to be able to collect its current parameter scope & to dynamically determine if it can tranform that input parameter to the appropriate output 
			to where its trying to transition => Aka dynamic resolver/transformers that search current node scope w/ help of `typename`, `sourceId`, & `dataLevel` data annotation req to make this possible
			- DONE. this is the secret
	- Decouple different dimensions & figure out correct tranformaation function that maps one subspace correctly to the other subspace (biz logic/state => UI combination/presentaiton)
	- Have extremely defined responsibilities (aka no coupling) & so biz flow can stream dynamically based on environmental input through a deterministic flow
	- Each Node
		- Can be recursive (eg. AA node can have a workflow within it. A node is its own encapsulaaated world & scope)
	- Each Edge
		- Can haave many waays to be expressed: inputSpace => outputSpace

- Layout (Purely abstract UI container that can encapsulate any other UI app level that makes sense - Most abstract container)
vs
- Application (Interface | Needs multiple workflows to encapsulate functionality)
	- Public 
	- Authentication

- Workflow (Entity | Needs multiple pages to encapsulate functionality)
	- Waiting-line
	- Admin
	- Login
	- Charting Module
	- Mapping Module
- Template (Entity | Functionality encapsulated in one page)
	- Desktop
	- Mobile
	- Queue Page
	- Waiting line signup page

Mapping/Topology:
- All data has a Typename prop
- Interface define what they need to subcribe to and when they expect it (they define next actions)
- All data representations in a system should register to an observable which streams into interface automatially at appropriate step in flow
- Deterministic (no loose ends in process)
- Dynamic Transformers from input => output facilitated by required Typename on all data representations & interface defined process


ARGUMENTS:
- Application can be abstracted to Interface (which, Interface classes, can be defined in app or library. Can be lazy loaded based on need)
- Interface in lib | Interface Class in DB w/ allowed ClassLink mappings defined to Workflows or whatever it needs + DataLevel for defining when it should trigger & in what higherlevel paarent/grandparent interface
	- Current highest level interface is: `App` level


# NOTE about AppLevel logic: 
- Every type of app would have an appLevel setup later. 
	- Like waiting line expects a queue
	- Admin expects a user
- Each app should be modulized for this app level requirement & at some point if necessary a dynamic app based on this could be created
	- Workflows may need to have intital level data requirements as well. All this should be defined at each level ***
	- This is important so that Setup Query can delegate appropriate responsibility to each component as it is rendered



================================================================================================
TODO:
- Attribute layer - topology & generic transformer
- Setup queries
- Feature split
- Lerna component management
- Switch to tailwindcss & component generation
	- https://blog.bitsrc.io/5-reasons-to-use-tailwind-css-with-react-native-1e7999c40b2e

================================================================================================
D3
https://devdocs.io/d3~4/d3-hierarchy#pack
https://www.newline.co/@kchan/writing-custom-react-hooks-for-d3-visualizations--4da835af
================================================================================================

Scaling UI Development:
https://www.uxpin.com/studio/blog/design-at-scale/
https://bootcamp.uxdesign.cc/design-dev-building-scalable-user-interface-the-painless-way-404dc6924e3c
https://observablehq.com/@tomlarkworthy/ui-development
https://www.invisionapp.com/inside-design/scale-design-systems/

- Business specific components | Lerna/dependency-manager quick dev | Storybook interface/playgound | Tailwind Design Process/Cmpts+Blocks

Important:
- Independent & agnostic features
- Testability during dev time w/ snapshots to test against after code changes
- Intellisense & compiletime typing
- Interface validation/allowed (config time)
- Rules for structure
- Shareable layouts
- Code change dependency viewer

Feature:
- On dependency update
- On user event
- On action/method 
    - hooks before & after
- Automatic error stack traces & isolation / breadcrumb reproducibility of errors / debugger tools
- End-to-end performance metrics (How long did the whole tree take to load on init)?
- Interface design early (like budget widget type) so all that follows after can have a common pipeline
- dependencies => Init (Async or event) => parallel/in-order => terminal/rest-state/loop
- IMPORTANT:
    - Centralizing from prev functions and rooting OR cloning

Interfaces:
- Closed logic & expected input + output

ENDGOAL:
- Extreme fast onboarding
- Stability
- Feature first programing (everything else is configuration)





------------------------------------------------------------------------------------
------------------------------------------------------------------------------------
------------------------------------------------------------------------------------
- Head functional component should only make a rxjs subject next trigger
    to alert central service map that we need a new service to be created
    for the cmpt
    - Service takes care of rest & persists

- Upper level widgets are only a wrapper for upper level
    widget configuration & config interface
    which may call more specific rest APIs to get other data
    and functionalities

- Dimensions are flat based on hiearchical tree data that narrows in on properties
    - This is how data will get determined for each widget instance

- Make a visual graph representation that imitates rxjs operations so these 
    are configurable & that does this for UI component events as well

------------------------------------------------------------------------------------
------------------------------------------------------------------------------------
------------------------------------------------------------------------------------




------------------------------------------------------------------------------------
------------------------------------------------------------------------------------
------------------------------------------------------------------------------------