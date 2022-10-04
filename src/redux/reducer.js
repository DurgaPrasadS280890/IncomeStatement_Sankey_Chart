/*{
income:[],
expense:[],
invest:[]
}*/

import { createSlice, current } from "@reduxjs/toolkit";

export const graphDataSlice = createSlice({
  name: "graphData",
  initialState: { income: [], expense: [], invest: [] },
  reducers: {
    addGraphdata(state, action) {
   
      const { id, detail } = action.payload;
      let temp = state[id];
     
      temp.push(detail);
     
      return state;
    },
    editGraphdata(state, action) {
   

      const { type, tab, keyid, edit, ind } = action.payload;
     
      if (type == "edit") {
        state[tab][ind][keyid] = edit;
      }
      if (type == "delete") {
        state[tab].splice(ind, 1);
      }

      return state;
    },
  },
});


//export const newone= graphDataSlice.getSelectors((state) => state.graphData)
//console.log("asasas "+newone)
export const { addGraphdata, editGraphdata } = graphDataSlice.actions;
//export const {addGraphdata:addGraphdata}=graphDataSlice.getSelectors((state) => state.users)
export default graphDataSlice.reducer;
