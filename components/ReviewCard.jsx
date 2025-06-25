import React from "react";
import { Card, Text, Group, Stack, Avatar, Rating, Flex } from "@mantine/core";
import { IconQuote } from "@tabler/icons-react";

/*
interface Review {
  id: string;
  reviewer_name: string;
  review_text: string;
  rating: number;
  created_at: string;
}
*/

export default function ReviewCard({ review }) {
  // Generate a consistent color based on the reviewer's name
  const getColorFromName = (name) => {
    const colors = [
      "#FFC107",
      "#FF5722",
      "#4CAF50",
      "#2196F3",
      "#9C27B0",
      "#3F51B5",
    ];
    const hash = name.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
    return colors[Math.abs(hash) % colors.length];
  };

  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("cs-CZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <Card
      style={{
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 10px",
      }}
      padding="lg"
      radius="md"
      h="100%"
      bg="white"
    >
      <Flex
        direction="column"
        h="100%"
        justify="space-between"
        gap={{ base: 8, sm: 16 }}
      >
        <Stack gap="xs">
          <Group justify="apart" align="flex-start" visibleFrom="sm">
            <IconQuote size={32} color="#8999ff" />
            <Rating value={review.rating} readOnly size="lg" />
          </Group>
          <Group justify="apart" align="flex-start" hiddenFrom="sm">
            <IconQuote size={20} color="#8999ff" />
            <Rating value={review.rating} readOnly size="sm" />
          </Group>

          <Text
            fz={{ base: "xs", sm: "sm" }}
            lineClamp={4}
            style={{ flexGrow: 1 }}
            c="black"
            title={review.review_text}
            visibleFrom="sm"
          >
            {review.review_text}
          </Text>
          <Text
            fz={{ base: "xs", sm: "sm" }}
            lineClamp={3}
            style={{ flexGrow: 1 }}
            c="black"
            title={review.review_text}
            hiddenFrom="sm"
          >
            {review.review_text}
          </Text>
        </Stack>

        <Group mt="md" justify="apart" align="center">
          <Group>
            <Avatar color={getColorFromName(review.reviewer_name)} radius="xl">
              {getInitials(review.reviewer_name)}
            </Avatar>
            <div>
              <Text fw={500} c="black" fz={{ base: "sm", sm: "md" }}>
                {review.reviewer_name}
              </Text>
              <Text size="xs" c="dimmed">
                {formatDate(review.created_at)}
              </Text>
            </div>
          </Group>
        </Group>
      </Flex>
    </Card>
  );
}
