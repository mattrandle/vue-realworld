<template>
    <div>
        <article-list :tag="tagname" :showTags="true"></article-list>
    </div>
</template>
<script>
import articleList from 'components/articleList'

export default {
    props: {
        tagname: {
            type: String,
            required: true
        }
    },
    components: {
        articleList
    }
}
</script>