import React from 'react';
import { Text, View, FlatList,TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import db from '../config';


export default class Searchscreen extends React.Component{
 constructor(props){
   super(props);
   this.state= {
     allTransactions:[],
     lastVisibleTransaction:null,
     search:''
   }
 }

 componentDidMount=async()=>{
   console.log("hello")
   const quary =await db.collection("transactions").get()
   quary.docs.map(doc=>{
     this.setState({
       allTransactions:[...this.state.allTransactions, doc.data()]
      //allTransactions:doc.data()
     })
     console.log(doc.data());
   })
 }
fetchMoreTransaction=async()=>{
  const quary =await db.collection("transactions").startAfter(this.state.lastVisibleTransaction).limit(10).get()

  quary.docs.map(doc=>{
    this.setState({
      allTransactions:[...this.state.allTransactions, doc.data()],
      lastVisibleTransaction:doc
     //allTransactions:doc.data()
    })    
  })
}

    render() {
      return (
        <View style={styles.container}>
          <View style={styles.searchBar}>
            <TextInput style={styles.bar}
                placeholder="Enter BookId or StudentId"
                onChangeText={text=>{this.setState({search:text})}}           
             />
             <TouchableOpacity style={styles.serachButton} 
             onPress={()=>{this.searchTransactions(this.state.search)}}
             >
               <Text>Search</Text>
             </TouchableOpacity>
          </View>
       <FlatList
           data={this.state.allTransactions}
           renderItem={({item})=>(
             <View style={{borderBottomWidth:2}}>
               <Text> {"book Id : " +item.bookId} </Text>
               <Text> {"student Id : " +item.studentId} </Text>
               <Text> {"transaction Type : " +item.transactionType} </Text>
               <Text> {"date : " +item.date} </Text>
             </View>
           )}
           keyExtractor={(item,index)=>{index.toString()}}
           onEndReached={this.fetchMoreTransaction}
           onEndReachedThreshold={0.7}
       />
      </View>

      )
    }
  }
