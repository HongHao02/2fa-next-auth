import { db } from '@/lib/db';

export const getEmailDetailById = async (emailId: number) => {
    try {
        const email = await db.email.findFirst({
            where: {
                id: emailId,
            },
            select: {
                id: true,
                subject: true,
                body: true,
                sentAt: true,
                sender: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        image: true,
                    },
                },
                recipients: {
                    select: {
                        recipient: {
                            select: {
                                id: true,
                                email: true,
                                name: true,
                            },
                        },
                    },
                },
                replies: {
                    select: {
                        replyTo: true,
                        repliedAt: true,
                        body: true,
                        sender: {
                            select: {
                                name: true,
                                image: true,
                                email: true
                            },
                        },
                        replies: {
                            select: {
                                body: true,
                                sender: {
                                    select: {
                                        name: true,
                                        email: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        return email;
    } catch (error) {
        return null;
    }
};
