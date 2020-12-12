const { Router } = require('express');
const router = Router();

const Post = require('../models/mongoSchema');

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://elasticsearch:9200' })


const updateElasticData = async (index, dataArray) => {
    try {
        await client.indices.create(
            {
                index: index,
            }
        );
            const body = dataArray.flatMap((doc) => [
            { index: { _index: index } },
            doc,
        ]);
        const { body: bulkResponse } = await client.bulk({ refresh: true, body });
        if (bulkResponse.errors) {
            console.log("ERROR");
            return bulkResponse.errors;
        } else {
            const { body: count } = await client.count({ index: index });
            console.log(count);
            return bulkResponse;      
        } 
    } catch (err) {
        return(err.massage)
    }
}

const deleteElasticData = async ()=>{
    await client.indices.delete(
        {
            index: '*',
        }
    );
}

router.post('/all', async (req, res) => {
    try {
        const posts = await Post.find();
        const updatePosts = updateElasticData('posts', posts);
        res.send(updatePosts)
    } catch (err) {
        res.send(err.massage)
    }
})

router.delete('/all', async (req, res) => {
    try {
        deleteElasticData()
        res.send('all data deleted');
    } catch (err) {
        res.send(err.massage);
    }
})

async function existsIndex(ind) {
    return await client.indices.exists({index: ind}).then(res => res.body)
}
router.post('/posts', async (req, res) => {
    const { id, title, content, author, date, tags } = req.body;
    if(await existsIndex("posts")) {
        const postsSearchIdResults = await client.search({ 
            index: 'posts',
            body: { 
                query: {
                    prefix: {
                        id: id
                    }
                }
            }
        })
        const postIdList = postsSearchIdResults.body.hits.hits;
        if (postIdList.length > 0) {
            res.status(301).send("post already in elastic data")
        } 
        else {
            try {
                const post = await client.index({
                    index: 'posts',
                    body: {
                        id: id,
                        title: title,
                        content: content,
                        author: author, 
                        date: date,
                        tags: tags
                    }
                })
                res.send(post)
            } catch (err) {
                res.send(err.message)
            }
        }
    } else {
        try {
            await client.indices.create(
                {
                    index: "posts",
                }
            );
            const post = await client.index({
                index: 'posts',
                body: {
                    id: id,
                    title: title,
                    content: content,
                    author: author, 
                    date: date,
                    tags: tags
                }
            })
            res.send(post)
        } catch (err) {
            res.send(err.massage)
        }
    }
})

router.get("/all", async (req, res) => {
    const name = req.query.params;
    if (name === "") res.send([])
    else {
        try {
            const postsSearchTitleResults = await client.search({ 
                index: 'posts',
                size: 3,
                body: { 
                    query: {
                        prefix: {
                            title: name
                        }
                    }
                }
            })
    
            const postsSearchContentResults = await client.search({ 
                index: 'posts',
                size: 3,
                body: { 
                    query: {
                        prefix: {
                            content: name
                        }
                    }
                }
            })
    
            const postsSearchAuthorResults = await client.search({ 
                index: 'posts',
                size: 3,
                body: { 
                    query: {
                        prefix: {
                            author: name
                        }
                    }
                }
            })
            
            res.send([postsSearchTitleResults.body.hits.hits.map(hit => hit._source), 
                postsSearchContentResults.body.hits.hits.map(hit => hit._source), 
                postsSearchAuthorResults.body.hits.hits.map(hit => hit._source)
            ])
        } catch (e) {
            res.send(e.message);
        }
    };
});
router.get("/posts/all", async (req, res) => {

    try {
        const posts = await client.search({ 
            index: 'posts',
            type: '_doc',
            size: 10000
        })
        
        res.send(posts.body.hits.hits.map(hit => hit._source))
    } catch (e) {
        res.send(e.message);
    }
});

router.get("/id/:id", async (req, res) => {
    const { id } = req.params;
    if (id === "") res.send([])
    else {
        try {
            const postSearchIdResult = await client.search({ 
                index: 'posts',
                size: 1,
                body: { 
                    query: {
                        prefix: {
                            id: id
                        }
                    }
                }
            })        
            res.send([postSearchIdResult.body.hits.hits[0]._source])
        } catch (e) {
            res.send(e.message);
        }
    };
});

router.get("/all/:word", async (req, res) => {
    let { word } = req.params;
    if (word === "") res.send([])
    word = word.toLowerCase();
    console.log(word)
    try {
        const postSearchIdResult = await client.search({ 
            index: 'posts',
            size: 1000,
            body: { 
                query: {
                    query_string: {
                        fields: ["content^3", "title^2", "author^1"], 
                        query: `*${word}*`
                    }
                }
            }
        })        
        res.send(postSearchIdResult.body.hits.hits.map(hit => hit._source))
    } catch (e) {
        res.send(e.message);
    }
});

router.get("/analysis", async (req, res) => {

    try {
        const moneyPostsByTitle = await client.search({ 
            index: 'posts',
            body: { 
                sort: { date: { order: 'desc' } }, 
                size: 1000,
                query: {
                    prefix: {
                        title: "money" || "cash" || "credit" || "buy" || "sell" || "$" || "€",
                    }
                }
            }
        })

        const moneyPostsByContent = await client.search({ 
            index: 'posts',
            body: { 
                sort: { date: { order: 'desc' } }, 
                size: 1000,
                query: {
                    prefix: {
                        content: "money" || "cash" || "credit" || "buy" || "sell" || "$" || "€",
                    }
                }
            }
        })

        const moneyPostsByAuthor = await client.search({ 
            index: 'posts',
            body: { 
                sort: { date: { order: 'desc' } }, 
                size: 1000,
                query: {
                    prefix: {
                        author: "money" || "cash" || "credit" || "buy" || "sell" || "bitcoin" || "bitcoins"|| "$" || "€",
                    }
                }
            }
        })

        const moneyPosts = [
            moneyPostsByTitle.body.hits.hits.map(hit => hit._source), 
            moneyPostsByContent.body.hits.hits.map(hit => hit._source), 
            moneyPostsByAuthor.body.hits.hits.map(hit => hit._source)
        ].map(arr => {
            arr.map(item => {
                item.id 
            })
        })
        res.send([
            moneyPostsByTitle.body.hits.hits.map(hit => hit._source), 
            moneyPostsByContent.body.hits.hits.map(hit => hit._source), 
            moneyPostsByAuthor.body.hits.hits.map(hit => hit._source)
        ])
    } catch (e) {
        res.send(e.message);
    }
});


module.exports = router;