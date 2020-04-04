[![npm version](https://badge.fury.io/js/redux-hot-module.svg)](https://badge.fury.io/js/redux-hot-module)
[![Build Status](https://travis-ci.com/gavrya/redux-hot-module.svg?branch=master)](https://travis-ci.com/gavrya/redux-hot-module)
[![Coverage Status](https://coveralls.io/repos/github/gavrya/redux-hot-module/badge.svg?branch=master)](https://coveralls.io/github/gavrya/redux-hot-module?branch=master)

# redux-hot-module

development in progress

## Installation

### npm

```shell
npm i redux-hot-module
```

### yarn

```shell
yarn add redux-hot-module
```

## Usage

```js
import { ReduxHotModule } from 'redux-hot-module'

// optional
const preloadedState = localStorage.getItem('searchResults')

const ml = new ReduxHotModule('searchResults', preloadedState)

// param actions
ml.addParamAction('posts', [])
ml.addParamAction('selectedPost', null)
ml.addParamAction('pageNumber', 1)
ml.addParamAction('pageSize', 10)
ml.addParamAction('loading', false)
ml.addParamAction('hasNext', false)

// event actions
ml.addEventAction('loadNextEvent')

// reset action
ml.addResetAction('reset')

export const {
  namespace,
  reducer,
  defaultState,
  withModuleProps,
  mapStateToProps,
  mapDispatchToProps,
  types: {
    SEARCH_RESULTS_POSTS,
    SEARCH_RESULTS_SELECTED_POST,
    SEARCH_RESULTS_PAGE_NUMBER,
    SEARCH_RESULTS_PAGE_SIZE,
    SEARCH_RESULTS_LOADING,
    SEARCH_RESULTS_HAS_NEXT,
    SEARCH_RESULTS_LOAD_NEXT_EVENT,
    SEARCH_RESULTS_RESET
  },
  actions: {
    postsAction,
    selectedPostAction,
    pageNumberAction,
    pageSizeAction,
    loadingAction,
    hasNextAction,
    loadNextEventAction,
    resetAction
  }
} = ml.create()
```

### unpkg

Library global name: ReduxHotModule

```html
<script src="https://unpkg.com/redux-hot-module@latest/lib/bundle.umd.min.js"></script>
```
