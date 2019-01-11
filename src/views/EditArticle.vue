<template>
    <article-editor :isNewArticle="false" :articleSlug="articleSlug">
    </article-editor>
</template>
<script>
import articleEditor from 'components/articleEditor';

export default {
    props: {
        articleSlug: {
            type: String,
            required: true
        }
    },
    components: {
        articleEditor
    }
}
</script>