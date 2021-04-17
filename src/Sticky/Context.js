import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  containerRef: null,
  stickyRefs: new Map(),
  debug: false
};

// Нет операции
const noop = () => {};

const initialDispatch = {
  setContainerRef: noop,
  addStickyRef: noop
};

const StickyStateContext = createContext(initialState);
const StickyDispatchContext = createContext(initialDispatch);

const ActionType = {
  setContainerRef: "set container ref",
  addStickyRef: "add sticky ref",
  toggleDebug: "toggle debug"
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case ActionType.setContainerRef:
      // Переназначение новой ссылки будет бесконечно перезагружаться!
      return Object.assign(state, {
        containerRef: { current: payload.containerRef }
      });
    case ActionType.addStickyRef:
      const { topSentinelRef, bottomSentinelRef, stickyRef } = payload;

      state.stickyRefs.set(topSentinelRef.current, stickyRef);
      state.stickyRefs.set(bottomSentinelRef.current, stickyRef);

      return Object.assign(state, {
        stickyRefs: state.stickyRefs
      });
    case ActionType.toggleDebug:
      return { ...state, debug: !state.debug };
    default:
      return state;
  }
}

function StickyProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setContainerRef = containerRef =>
    dispatch({ type: ActionType.setContainerRef, payload: { containerRef } });

  const addStickyRef = (topSentinelRef, bottomSentinelRef, stickyRef) =>
    dispatch({
      type: ActionType.addStickyRef,
      payload: { topSentinelRef, bottomSentinelRef, stickyRef }
    });

  const toggleDebug = () => dispatch({ type: ActionType.toggleDebug });

  const actions = {
    setContainerRef,
    addStickyRef,
    toggleDebug
  };

  return (
    <StickyStateContext.Provider value={state}>
      <StickyDispatchContext.Provider value={actions}>
        {children}
      </StickyDispatchContext.Provider>
    </StickyStateContext.Provider>
  );
}

function useStickyState() {
  const context = useContext(StickyStateContext);
  if (context === undefined)
    throw Error('"useStickyState следует использовать при "StickyStateContext');
  return context;
}

function useStickyActions() {
  const context = useContext(StickyDispatchContext);
  if (context === undefined)
    throw Error(
      '"useStickyActions следует использовать при "StickyDispatchContext'
    );
  return context;
}

const initialSectionValues = {
  topSentinelRef: null,
  bottomSentinelRef: null
};

const StickySectionContext = createContext(initialSectionValues);

export {
  StickyProvider,
  useStickyState,
  useStickyActions,
  ActionType,
  StickySectionContext
};
