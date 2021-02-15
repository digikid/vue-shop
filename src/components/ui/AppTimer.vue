<template>
  <div class="timer">
    <p v-if="from">
      <span>В ожидании:</span>
      <strong>{{ passed }}</strong>
    </p>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { time } from '@/utils/format/time'

export default {
  name: 'AppTimer',
  props: {
    from: Number
  },
  setup(props) {
    const passed = ref(props.from ? time(Date.now() - props.from) : null)

    let interval = null

    onMounted(() => {
      if (props.from && !interval) {
        setInterval(() => {
          passed.value = time(Date.now() - props.from)
        }, 1000)
      }
    })

    onUnmounted(() => {
      clearInterval(interval)
    })

    return {
      passed
    }
  }
}
</script>

<style scoped>
.timer {
  font-size: 12px;
  text-align: center;
}

.timer p {
  margin: 5px 0 0;
}

.timer span {
  display: block;
}

.timer strong {
  display: inline-block;
  min-width: 80px;
  font-weight: bold;
  background: #3eaf7c;
  color: #fff;
  padding: 3px 7px;
  border-radius: 6px;
}
</style>
