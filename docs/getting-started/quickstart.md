# Quickstart

If I add a [link to something](https://gogle.com) here

Here is some `code`

Here is a longer example

```
plain text
```


```javascript
function foo() {
  return "bar";
}
```

```typescript
// This example transcribes a file in NodeJS.
// For examples in other environments, see the link above

import { BatchClient } from '@speechmatics/batch-client';
import { openAsBlob } from 'node:fs';

const client = new BatchClient({ apiKey: YOUR_API_KEY, appId: 'nodeJS-example' });

console.log('Sending file for transcription...');

async function transcribeFile() {
  const blob = await openAsBlob('./example.wav');
  const file = new File([blob], 'example.wav');

  const response = await client.transcribe(
    file,
    {
      transcription_config: {
        language: 'en',
      },
    },
    'json-v2',
  );

  console.log('Transcription finished!');

  console.log(
    // Transcripts can be strings when the 'txt' format is chosen
    typeof response === 'string'
      ? response
      : response.results.map((r) => r.alternatives?.[0].content).join(' '),
  );
}

transcribeFile();

```

```yaml
apiVersion: 3.0
pods:
  - foo
  - bar
  - baz
```