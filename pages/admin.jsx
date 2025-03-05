import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../lib/supabaseClient";

import Brands from "@/components/admin/Brands";
import { Button, Flex, Stack, Text, Title } from "@mantine/core";
import Models from "@/components/admin/Models";
import Engines from "@/components/admin/Engines";
import Realizations from "@/components/admin/Realizations";
import PromotionalBanners from "@/components/admin/PromotionalBanners";

const Admin = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        router.push("/login"); // Redirect to login if no user is found
      } else {
        setUser(session.user);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return <p>Loading...</p>; // Show a loading state while checking auth
  }

  return (
    <Stack p={32}>
      <Title>Administrace</Title>
      <Flex gap={16} align="center" wrap="wrap">
        <Text>Přihlášen jako: {user.email}!</Text>
        <Button
          size="compact-xs"
          color="red"
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/login");
          }}
        >
          Odhlásit
        </Button>
      </Flex>

      <Stack gap={48}>
        <Brands />
        <Models />
        <Engines />
        <Realizations />
        <PromotionalBanners />
      </Stack>
    </Stack>
  );
};

export default Admin;
