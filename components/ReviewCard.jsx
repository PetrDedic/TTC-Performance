import React from "react";
import { Card, Text, Group, Stack, Avatar, Rating } from "@mantine/core";
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
    <Card shadow="sm" padding="lg" radius="md" withBorder h="100%" bg="white">
      <Stack h="100%" justify="space-between">
        <Stack gap="xs">
          <Group justify="apart" align="flex-start">
            <IconQuote size={24} color="#8999ff" />
            <Rating value={review.rating} readOnly />
          </Group>

          <Text size="sm" lineClamp={4} style={{ flexGrow: 1 }} c="black">
            {review.review_text}
          </Text>
        </Stack>

        <Group mt="md" justify="apart" align="center">
          <Group>
            <Avatar color={getColorFromName(review.reviewer_name)} radius="xl">
              {getInitials(review.reviewer_name)}
            </Avatar>
            <div>
              <Text fw={500} c="black">
                {review.reviewer_name}
              </Text>
              <Text size="xs" c="dimmed">
                {formatDate(review.created_at)}
              </Text>
            </div>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}
