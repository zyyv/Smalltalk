<template>
  <div class="group">
    <div class="tab-content">
      <h2 class="title">Create Group</h2>
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
      <ul class="tabs">
        <li @click="changePanel('one')"
            class="tab"
            :class="activePanel === 'one' ? 'active' : ''">
          <a>Details</a>
        </li>
        <li @click="changePanel('two')"
            class="tab"
            :class="activePanel === 'two' ? 'active' : ''">
          <a>Members</a>
        </li>
      </ul>
      <div class="tab-panels">
        <transition name="fade"
                    mode="out-in">
          <div v-if="activePanel === 'one'"
               class="panel-one">
            <a-form layout="vertical">
              <a-form-item label="Photo">
                <a-upload-dragger class="f-upload"
                                  name="photo"
                                  :multiple="true"
                                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                  @change="handleChange">
                  <p class="ant-upload-drag-icon">
                    <inbox-outlined />
                  </p>
                  <p>You can upload jpg, gif or png files.</p>
                  <p class="ant-upload-hint">Max file size 3mb.</p>
                </a-upload-dragger>
              </a-form-item>
              <a-form-item label="Name"
                           v-bind="validateInfos.name">
                <a-input class="f-input"
                         v-model:value="modelRef.name"
                         placeholder="Group Name" />
              </a-form-item>
              <a-form-item label="Topic (optional)">
                <a-input class="f-input"
                         v-model:value="modelRef.topic"
                         placeholder="Group Topic" />
              </a-form-item>
              <a-form-item label="Description"
                           v-bind="validateInfos.description">
                <a-textarea class="f-textarea"
                            v-model:value="modelRef.description"
                            placeholder="Group Description"
                            :auto-size="{ minRows: 5, maxRows: 10 }" />
              </a-form-item>
            </a-form>
          </div>
          <div v-else
               class="panel-two">
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
                  <a-checkbox :checked="Math.random() > 0.5" />
                </template>
              </Card>
            </div>
            <!-- <div class="name-group">
              <div class="name-title">B</div>
              <Card class="name-card"
                    v-for="item in 3"
                    :key="item">
                <a-checkbox :checked="Math.random() > 0.5" />
              </Card>
            </div>
            <div class="name-group">
              <div class="name-title">C</div>
              <Card class="name-card"
                    v-for="item in 3"
                    :key="item">
                <a-checkbox :checked="Math.random() > 0.5" />
              </Card>
            </div> -->
          </div>
        </transition>
      </div>
    </div>
    <div class="create">
      <a-button @click="$router.push('/login')"
                class="f-button panel-btn"
                type="primary"
                block>Create Group</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRaw } from 'vue'
import { useForm } from '@ant-design-vue/use'
import { InboxOutlined } from '@ant-design/icons-vue'
import Card from '@c/Card.vue'
export default defineComponent({
  name: 'group',
  components: { InboxOutlined, Card },
  setup() {
    const modelRef = reactive({
      photo: '',
      name: '',
      topic: '',
      description: ''
    })
    const rulesRef = reactive({
      name: [
        {
          message: 'Please input name'
        }
      ],
      description: [
        {
          message: 'Please input description'
        }
      ]
    })
    const { validate, validateInfos } = useForm(modelRef, rulesRef)
    const onSubmit = (e) => {
      e.preventDefault()
      validate()
        .then(() => {
          console.log(toRaw(modelRef))
        })
        .catch((err) => {
          console.log('error', err)
        })
    }
    const handleChange = (info) => {
      // const status = info.file.status;
      // if (status !== 'uploading') {
      //   console.log(info.file, info.fileList);
      // }
      // if (status === 'done') {
      //   this.$message.success(`${info.file.name} file uploaded successfully.`);
      // } else if (status === 'error') {
      //   this.$message.error(`${info.file.name} file upload failed.`);
      // }
    }
    const activePanel = ref('one')
    const changePanel = (val) => {
      activePanel.value = val
    }
    return {
      activePanel,
      changePanel,
      validateInfos,
      modelRef,
      onSubmit,
      handleChange
    }
  }
})
</script>
<style lang='scss' scoped>
.group {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  .tab-content {
    flex: 1;
    overflow: hidden auto;
    padding: 1.25rem 20px 0;
    &::-webkit-scrollbar {
      display: none;
    }
    .title {
      font-weight: 700;
      margin-bottom: 1.25rem;
    }
    .tabs {
      list-style: none;
      user-select: none;
      background: #edeef6;
      border-radius: 0.475rem;
      padding: 0.55rem;
      margin-bottom: 1.25rem;
      display: flex;
      .tab {
        flex: 1;
        &.active {
          a {
            color: #212529;
            background-color: #fff;
            border-color: #dee2e6 #dee2e6 #fff;
          }
        }
        a {
          display: block;
          transition: all 0.25s ease-in-out;
          text-align: center;
          padding: 0.6875rem 1rem;
          border-radius: 0.475rem;
          &:hover {
            cursor: pointer;
            color: #212529;
          }
        }
      }
    }
    .tab-panels {
      .panel-two {
        .name-group {
          .name-title {
            margin-bottom: 1.25rem;
            font-size: 13px;
            color: #7f808c;
          }
          .name-card {
            margin-bottom: 1.25rem;
            .body {
              flex: 1;
              margin-right: 1.25rem;
              overflow: hidden;
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
  .create {
    padding: 0 20px 1.25rem;
  }
}
.f-button {
  height: auto;
  padding: 1.275rem 1.25rem;
  font-size: 1.275rem;
  line-height: 1.6;
  border-radius: 0.475rem;
}
</style>
