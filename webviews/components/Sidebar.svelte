<script lang="ts">
    let codes: Array<string> = [];
    let query = "";
    let post_url = "http://127.0.0.1:8000/api/fetch-code/";
    let debugs: string[] = [];


    window.onload = function fetchDebugs() {
        let ul = document.getElementById("codesList");
        ul.innerHTML = '';
        for (let i = 0; i < debugs.length; i++) {
            let li = document.createElement("li");
            li.innerHTML = `<pre>${debugs[i]}<br></pre>`;
            ul.appendChild(li);
        }
    }
    

    function errorHandler(message: string)
    {
        query = "";
        let ul = document.getElementById("codesList");
        ul.innerHTML = '';  // clear the list of items
        let li = document.createElement("li");
        li.innerHTML = message;
        ul.appendChild(li);
    }

    async function fetchCodes() {
        let query_copy = query;
        query = "Fetching codes...";
        const response = await fetch(post_url, {
            method : "POST",
            body : JSON.stringify({
                "query" : query_copy
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            codes = await response.json();
            query = ""; 

            if (codes.length === 0) {
                errorHandler(`No codes found for query: ${query_copy}`);

            }else{
                let ul = document.getElementById("codesList");
                ul.innerHTML = '';  // clear the list of items

                for (let i = 0; i < codes.length; i++) {
                    let li = document.createElement("li");
                    li.innerHTML = `<pre>${codes[i]}<br></pre>`;
                    ul.appendChild(li);
                }
            }
        }else {
            errorHandler("Something went wrong. Try again");
        }
    
    }

</script>

<style></style>

<form on:submit|preventDefault={fetchCodes}>
    <input bind:value={query}/>
</form>

<ul id="codesList">
</ul>

<ul id="debugsList">
</ul>
