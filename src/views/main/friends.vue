<template>
  <div class="friends">
    <div class="content">
      <h2 class="title">Friends</h2>
      <div class="input-group">
        <input placeholder="Search for messages or users..."
               type="text" />
        <div>
          <svg width="1em"
               height="1em"
               viewBox="0 0 16 16"
               class="bi bi-search"
               fill="currentColor"
               xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
            <path fill-rule="evenodd"
                  d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
          </svg>
        </div>
      </div>
      <a-button @click="modalRef.status = true"
                class="invite"
                block>
        <h6>Invite friends</h6>
        <TeamOutlined style="font-size: 16px" />
      </a-button>
      <div class="contacter">
        <div class="name-group">
          <div class="name-title">A</div>
          <Card class="name-card"
                v-for="item in 3"
                :key="item">
            <div class="body">
              <h6 class="name">Chris Brwon</h6>
              <p class="info">Online</p>
            </div>
            <template v-slot:right>
              <a-tooltip overlayClassName="friendTooltip"
                         trigger="click"
                         placement="bottomRight">
                <template v-slot:title>
                  <ul class="menus">
                    <li class="menu">
                      <span>New Chat</span>
                      <EditOutlined />
                    </li>
                    <li class="menu">
                      <span>Delete</span>
                      <DeleteOutlined />
                    </li>
                  </ul>
                </template>
                <MoreOutlined />
              </a-tooltip>
            </template>
          </Card>
        </div>
      </div>
    </div>
    <a-modal width="500px"
             centered
             :footer="null"
             v-model:visible="modalRef.status"
             :confirm-loading="modalRef.btnLoading"
             @ok="handleOk">
      <template v-slot:title>
        <div class="title-box">
          <div class="icon">
            <TeamOutlined style="font-size: 16px; color: #fff" />
          </div>
          <div class="text">
            <h5>Invite friends</h5>
            <p>Invite colleagues, clients and friends.</p>
          </div>
        </div>
      </template>
      <a-form layout="vertical">
        <a-form-item label="Email">
          <a-input class="f-input"
                   v-model:value="modelRef.email" />
        </a-form-item>
        <a-form-item label="Invitation message">
          <a-textarea class="f-textarea"
                      v-model:value="modelRef.description"
                      :auto-size="{ minRows: 2, maxRows: 4 }" />
        </a-form-item>
      </a-form>
      <a-button type="primary"
                class="submitBtn"
                block>
        <h6>Invite friends</h6>
        <TeamOutlined style="font-size: 1.6rem" />
      </a-button>
    </a-modal>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import Card from '@c/Card.vue'
import {
  TeamOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue'
export default defineComponent({
  name: 'friends',
  components: {
    Card,
    TeamOutlined,
    MoreOutlined,
    EditOutlined,
    DeleteOutlined
  },
  setup() {
    const modalRef = reactive({
      status: false,
      btnLoading: false
    })
    const modelRef = reactive({
      email: '',
      description: ''
    })
    const handleOk = () => {}
    return { modalRef, modelRef, handleOk }
  }
})
</script>
<style lang='scss' scoped>
.friends {
  .content {
    padding: 1.25rem 20px;
    .title {
      font-weight: 700;
      margin-bottom: 1.25rem;
    }
    .invite {
      margin-bottom: 1.25rem;
      background: #edeef6;
      border: none;
      border-radius: 0.475rem;
      padding: 1.175rem 1.25rem;
      height: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background 0.35s ease-in-out;
      &:focus {
        color: var(--color);
      }
      &:hover {
        color: var(--color);
        background: #d3d7d9;
      }
      > h6 {
        font-size: 13px;
        margin: 0;
      }
    }
    .contacter {
      .name-group {
        .name-title {
          margin-bottom: 1.25rem;
          font-size: 13px;
          color: var(--color);
        }
        .name-card {
          margin-bottom: 1.25rem;
          .body {
            flex: 1;
            overflow: hidden;
            margin-right: 1.25rem;
            .name {
              max-width: 15rem;
            }
            .name,
            .info {
              margin: 0;
            }
            .info {
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #aab0b7;
              font-size: 1.3rem;
            }
          }
        }
      }
    }
  }
}
.title-box {
  display: flex;
  align-items: center;
  .icon {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.425rem;
    background-color: #0176ff;
    margin-right: 15px;
  }
  .text {
    h5 {
      margin: 0;
      font-size: 15px;
    }
    p {
      margin: 0;
      font-size: 13px;
      color: #7f808c;
    }
  }
}
.submitBtn {
  margin-bottom: 1.25rem;
  border: none;
  border-radius: 0.475rem;
  padding: 1.175rem 1.25rem;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.35s ease-in-out;
  > h6 {
    color: var(--white);
    font-size: 1.3rem;
    margin: 0;
  }
}
</style>
