const Types = {
  GET: "GET",
  SET: "SET",
  ADD: "ADD",
  UPDATE: "UPDATE",
  REMOVE: "REMOVE",
};

const INITIAL_STATE = {
  availableNumberList: [],
  availableNumberListCount: 0,
  availableNumber: []
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET:
      return {
        ...state,
        availableNumberList: action.payload.rows,
        availableNumberListCount: action.payload.count,
      };
    case Types.SET:
      return {
        ...state,
        availableNumber: {
          ...action.payload,
        },
      };
    case Types.ADD:
      return {
        ...state,
        availableNumberList: action.payload.rows,
        availableNumberListCount: action.payload.count,
      };
    case Types.UPDATE:
      return {
        ...state,
        availableNumberList: action.payload.rows,
        availableNumberListCount: action.payload.count,
      };
    case Types.REMOVE:
      return {
        ...state,
        availableNumberList: action.payload.rows,
        availableNumberListCount: action.payload.count,
      };
    default:
      return state;
  }
}

export function getAvailableNumber(data) {
  return {
    type: Types.GET,
    payload: data,
  }
}

export function setAvailableNumber(data) {
  return {
    type: Types.SET,
    payload: data,
  }
}

export function addAvailableNumber(data) {
  return {
    type: Types.ADD,
    payload: data,
  }
}

export function updateAvailableNumber(data) {
  return {
    type: Types.UPDATE,
    payload: data,
  }
}

export function removeAvailableNumber(data) {
  return {
    type: Types.REMOVE,
    payload: data,
  }
}