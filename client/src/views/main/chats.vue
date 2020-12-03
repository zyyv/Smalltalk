<template>
  <div class="chats">
    <div class="content">
      <h2 class="title">Chats</h2>
      <div class="input-group">
        <input placeholder="Search for messages or users..."
               type="text">
        <div><svg width="1em"
               height="1em"
               viewBox="0 0 16 16"
               class="bi bi-search"
               fill="currentColor"
               xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
            <path fill-rule="evenodd"
                  d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
          </svg></div>
      </div>
      <div class="contacter">
        <div class="user"
             v-for="(user,i) in peoples"
             :key="i">
          <Avatar width="4.4rem"
                  height="4.4rem"
                  :online="user.status === 'online'"
                  src="https://himg.bdimg.com/sys/portraitn/item/89c7456e646c657373746561726c9c89" />
          <p class="user-name ellipsis">{{user.name}}</p>
        </div>
      </div>
      <div class="messages">
        <Card v-for="i in 10"
              :key="i"
              class="card"
              :notify="i">
          <div class="body">
            <div class="info">
              <h6 class="name ellipsis">Chris Borwd</h6>
              <span class="time">06:00 am</span>
            </div>
            <div class="msg ellipsis">Anna Bridges: Hey, Maher! How are you? The weather is great isn't it?</div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import Avatar from '/@c/Avatar.vue';
import Card from '/@c/Card.vue';

export default {
  name: 'chats',
  components: { Avatar, Card },
  setup() {
    const peoples = reactive([
      { name: 'william', status: 'online' },
      { name: 'william2', status: 'online' },
      { name: 'william5', status: 'online' },
      { name: 'william1william1', status: 'Offline' },
      { name: 'william3', status: 'Offline' },
      { name: 'william4', status: 'Offline' },
      { name: 'william5', status: 'online' },
      { name: 'william1william1', status: 'Offline' },
      { name: 'william3', status: 'Offline' },
      { name: 'william4', status: 'Offline' },
    ]);
    return { peoples };
  },
};
</script>
<style lang='scss' scoped>
.chats {
  .content {
    padding: 1.25rem 20px;
    .title {
      font-weight: 700;
      margin-bottom: 1.25rem;
    }
    .contacter {
      margin: 2rem 0;
      display: flex;
      overflow: auto hidden;
      &::-webkit-scrollbar {
        display: none;
      }
      .user {
        display: flex;
        width: 4.8rem;
        flex-direction: column;
        align-items: center;
        margin-right: 1.5rem;
        &:last-child {
          margin-right: 0;
        }
        .user-name {
          width: 100%;
          text-align: center;
          margin: 0;
          margin-top: 1rem;
          font-size: 1.2rem;
        }
      }
    }
    .messages {
      .card {
        margin-bottom: 1.25rem;
        &:last-child {
          margin-bottom: 0;
        }
        .body {
          flex: 1;
          overflow: hidden;
          .info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.2rem;
            .name {
              margin: 0;
              max-width: 15rem;
            }
            .time {
              font-size: 1rem;
              color: var(--gray);
            }
          }
        }
      }
    }
  }
}
</style>
