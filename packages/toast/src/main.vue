<template>
  <div class="rule">
    <ul class="rule-list">
      <li>
        <i>121</i>
        <span>消耗1张抽奖券可抽奖1次，每次抽奖必中；</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MiToast',
  data () {
    return {}
  },
  methods: {
    close () {
      const abc = Math.random()
      console.log(abc)
    }
  }
}
</script>

