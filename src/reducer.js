export const initialState = {
    allergy: [],
    preference: [],
    budget: null,
    rating: null,
    diet: null,
    basket: [],
    user: null,
};

// Selector
export const getBasketTotal = (basket) => 
  basket?.reduce((amount, item) => item.price * 100 + amount, 0);

const reducer = (state, action) => {
  //console.log(action);
  switch (action.type) {
    case "UPDATE_FILTER":
      return {
        ...state, 
        allergy: action.allergy,
        preference: action.preference,
        budget: action.budget,
        rating: action.rating,
        diet: action.diet
      }
      
    case "ADD_TO_BASKET":
        return {
        ...state,
        basket: [...state.basket, action.item],
      };
    
    case 'EMPTY_BASKET':
      return {
        ...state,
        basket: []
      }

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);

      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        )
      }

      return {
        ...state,
        basket: newBasket
      }
    
    case "SET_USER":
      return {
        ...state,
        user: action.user
      }

    default:
      return state;
  }
};

export default reducer;
