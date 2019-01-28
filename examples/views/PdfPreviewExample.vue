<script>
export default {
  data () {
    return {
      pdfUrl: '../assets/pdf/demo.pdf'
    }
  },
  render () {
    return (
      <div>
        <mi-pdf-preview url={this.pdfUrl} />
      </div>
    )
  }
}
</script>
