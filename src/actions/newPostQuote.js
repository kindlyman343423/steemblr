import { PUT_NEW_POST_QUOTE, PUT_NEW_POST_QUOTE_SOURCE } from "./types";

export const newPostQuote = props => dispatch => {
  dispatch({
    type: PUT_NEW_POST_QUOTE,
    payload: props
  });
};

export const newPostQuoteSource = props => dispatch => {
  dispatch({
    type: PUT_NEW_POST_QUOTE_SOURCE,
    payload: props
  });
};
