<script>
// import pdfPreview from '../../packages/pdf-preview/index'
export default {
  // components: {
  //   pdfPreview
  // },
  data () {
    return {
      pdfUrl: '../assets/pdf/demo.pdf'
    }
  },
  render () {
    return (
      <div>
        <m-pdf-preview url={this.pdfUrl} />
      </div>
    )
  }
}
</script>
