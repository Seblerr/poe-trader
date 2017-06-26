<template>

<div class="hello">
  <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap@next/dist/css/bootstrap.min.css"/>
  <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css"/>

  <input v-model="msg" v-on:keyup.enter="searchItem(msg)"/><br><br>
  <button class="btn btn-book" v-on:click="searchItem(msg)">Search</button><br><br>


  <table class="table table-bordered table-hover table-sm">
    <thead>
      <!-- Correct headers are set here -->
      <tr class="table-titles">
        <th> Item </th>
        <th> Price </th>
        <th> League </th>
        <th> Character Name </th>
        <!-- <th> From: Location </th> -->
      </tr>
    </thead>
    <tbody align="left">
      <tr v-for="item in searchResult">
        <td> {{ item.name }} </td>
        <td> {{ item.note }} </td>
        <td> {{ item.league }}</td>
        <td> {{ item.lastCharacterName }}</td>
      </tr>
    </tbody>
  </table>



</div>
</template>
<script src="//unpkg.com/babel-polyfill@latest/dist/polyfill.min.js"></script>
<script src="//unpkg.com/tether@latest/dist/js/tether.min.js"></script>
<script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js"></script>
<script>
import axios from 'axios'
const api = axios.create()

export default {
  async created () {
    this.init()
  },
  data () {
    return {
      msg: '',
      nextID: '',
      allItems: '',
      searchResult: '',
      currentItems: ''
    }
  },
  methods: {
    async init () {
      var allItems = []
      this.nextID = await this.getID()
      while (true) {
        await this.getStashes(this.nextID).then(async (response) => {
          var stashes = response.stashes
          // console.log(stashes)
          var items = await this.getItems(stashes)
          // console.log(items)
          allItems = allItems.concat(items)
          this.allItems = allItems
          // console.log(allItems)
          this.nextID = response.next_change_id
          await this.sleep(1000)
        })
      }
    },

    async getStashes (id) {
      const response = await api.post(`/api/getStashes/${id}`)
      return response.data
    },

    async getID () {
      const response = await api.post(`/api/getNextID`)
      return response.data
    },

    async getItems (stashes) {
      var items = []
      stashes.forEach(function (stash) {
        items.push({lastCharacterName: stash.lastCharacterName,
          items: stash.items})
        // })
      })
      return items
    },

    searchItem (keyword) {
      var self = this
      var results = []

      this.allItems.forEach(function (stash) {
        stash.items.forEach(function (item) {
          // console.log(item.note.substring(4))
          if (keyword === item.name.substring(28)) {
            results.push({
              lastCharacterName: stash.lastCharacterName,
              note: item.note,
              name: item.name.substring(28),
              league: item.league
            })
            self.searchResult = results
          }
        })
      })
      console.log(self.searchResult)
    },

    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
