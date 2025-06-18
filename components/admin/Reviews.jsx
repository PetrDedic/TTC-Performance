import { useState, useEffect } from "react";
import supabase from "@/lib/supabaseClient";

import {
  Table,
  Button,
  Modal,
  TextInput,
  Textarea,
  Group,
  ActionIcon,
  Text,
  Title,
  ScrollArea,
  Flex,
  Loader,
  Rating,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { DateInput, DatePicker } from "@mantine/dates";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  // State for Form Data
  const [formData, setFormData] = useState({
    reviewer_name: "",
    review_text: "",
    rating: 0,
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  // Fetch reviews from the database
  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      notifications.show({
        title: "Chyba",
        message: "Nepodařilo se načíst recenze.",
        color: "red",
      });
      console.error("Error fetching reviews:", error);
    } else {
      setReviews(data);
    }
    setLoading(false);
  };

  // Open Modal for Adding or Editing
  const openModal = (review = null) => {
    if (review) {
      // Editing
      setEditingReview(review);
      setFormData({
        reviewer_name: review.reviewer_name,
        review_text: review.review_text,
        rating: review.rating,
        created_at: review.created_at,
      });
    } else {
      // Adding
      setEditingReview(null);
      setFormData({
        reviewer_name: "",
        review_text: "",
        rating: 0,
        created_at: new Date(),
      });
    }
    setIsModalOpen(true);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingReview) {
      // Update existing review
      const { error } = await supabase
        .from("reviews")
        .update({
          reviewer_name: formData.reviewer_name,
          review_text: formData.review_text,
          rating: formData.rating,
          created_at: formData.created_at,
        })
        .eq("id", editingReview.id);

      if (error) {
        notifications.show({
          title: "Chyba",
          message: "Nepodařilo se upravit recenzi.",
          color: "red",
        });
        console.error("Error updating review:", error);
      } else {
        await fetchReviews();
        setIsModalOpen(false);
        notifications.show({
          title: "Úspěch",
          message: "Recenze byla úspěšně upravena.",
          color: "green",
        });
      }
    } else {
      // Create new review
      const { error } = await supabase.from("reviews").insert({
        reviewer_name: formData.reviewer_name,
        review_text: formData.review_text,
        rating: formData.rating,
        created_at: formData.created_at,
      });

      if (error) {
        notifications.show({
          title: "Chyba",
          message: "Nepodařilo se vytvořit recenzi.",
          color: "red",
        });
        console.error("Error creating review:", error);
      } else {
        await fetchReviews();
        setIsModalOpen(false);
        notifications.show({
          title: "Úspěch",
          message: "Recenze byla úspěšně vytvořena.",
          color: "green",
        });
      }
    }
  };

  // Delete a review
  const handleDelete = (reviewId) => {
    modals.openConfirmModal({
      title: "Potvrdit smazání",
      centered: true,
      children: (
        <Text size="sm">
          Opravdu chcete smazat tuto recenzi? Tato akce je nevratná.
        </Text>
      ),
      labels: { confirm: "Smazat", cancel: "Zrušit" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        const { error } = await supabase
          .from("reviews")
          .delete()
          .eq("id", reviewId);
        if (error) {
          notifications.show({
            title: "Chyba",
            message: "Nepodařilo se smazat recenzi.",
            color: "red",
          });
          console.error("Error deleting review:", error);
        } else {
          await fetchReviews();
          notifications.show({
            title: "Úspěch",
            message: "Recenze byla úspěšně smazána.",
            color: "green",
          });
        }
      },
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("cs-CZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div>
      <Group position="apart" mb="md">
        <Title order={2}>Recenze</Title>
        <Button onClick={() => openModal()} size="compact-sm" color="green">
          Přidat recenzi
        </Button>
      </Group>

      {loading ? (
        <Loader size="lg" />
      ) : (
        <ScrollArea h={500}>
          <Table striped bg="#cfcfcf" stickyHeader>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Recenzent</Table.Th>
                <Table.Th>Hodnocení</Table.Th>
                <Table.Th>Text recenze</Table.Th>
                <Table.Th>Datum</Table.Th>
                <Table.Th>Akce</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {reviews.map((review) => (
                <Table.Tr key={review.id}>
                  <Table.Td>{review.reviewer_name}</Table.Td>
                  <Table.Td>
                    <Rating value={review.rating} readOnly />
                  </Table.Td>
                  <Table.Td>
                    <Text lineClamp={2}>{review.review_text}</Text>
                  </Table.Td>
                  <Table.Td>{formatDate(review.created_at)}</Table.Td>
                  <Table.Td>
                    <Flex gap="xs">
                      <ActionIcon
                        color="blue"
                        onClick={() => openModal(review)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        color="red"
                        onClick={() => handleDelete(review.id)}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Flex>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      )}

      {/* Modal for Add/Edit */}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingReview ? "Upravit recenzi" : "Přidat recenzi"}
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Jméno recenzenta"
            placeholder="Jméno recenzenta"
            value={formData.reviewer_name}
            onChange={(e) =>
              setFormData({ ...formData, reviewer_name: e.target.value })
            }
            required
            mb="sm"
          />

          <Textarea
            label="Text recenze"
            placeholder="Text recenze"
            value={formData.review_text}
            onChange={(e) =>
              setFormData({ ...formData, review_text: e.target.value })
            }
            minRows={3}
            required
            mb="sm"
          />
          <DateInput
            locale="cs"
            label="Datum"
            value={formData.created_at}
            onChange={(value) =>
              setFormData({ ...formData, created_at: value })
            }
            required
            mb="sm"
          />
          <Rating
            label="Hodnocení"
            value={formData.rating}
            onChange={(value) => setFormData({ ...formData, rating: value })}
            required
            mb="lg"
          />

          <Group position="right" mt="md">
            <Button type="submit">
              {editingReview ? "Upravit" : "Vytvořit"}
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
};

export default Reviews;
