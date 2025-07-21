import Translate from "@docusaurus/Translate";
import { Box, Flex } from "@radix-ui/themes";
import Heading from "@theme/Heading";
import type { Props } from "@theme/NotFound/Content";
import { SearchXIcon } from "lucide-react";
import React, { type ReactNode } from "react";

export default function NotFoundContent({ className }: Props): ReactNode {
  return (
    <Flex
      direction="column"
      asChild
      justify="start"
      align="center"
      height="100%"
    >
      <main>
        <Box p="4">
          <SearchXIcon size={128} color="var(--gray-8)" />
        </Box>
        <Heading as="h1" className="hero__title">
          <Translate
            id="theme.NotFound.title"
            description="The title of the 404 page"
          >
            Page Not Found
          </Translate>
        </Heading>
        <p>
          <Translate
            id="theme.NotFound.p1"
            description="The first paragraph of the 404 page"
          >
            We could not find what you were looking for.
          </Translate>
        </p>
        <p>
          <Translate
            id="theme.NotFound.p2"
            description="The 2nd paragraph of the 404 page"
          >
            Please contact the owner of the site that linked you to the original
            URL and let them know their link is broken.
          </Translate>
        </p>
      </main>
    </Flex>
  );
}
